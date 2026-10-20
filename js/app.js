/**
 * @file app.js
 * @description Ponto de entrada modular (ES6+) da aplicação DevSide Quiz.
 *              Orquestra o fluxo entre a Store de estado, Renderizador DOM,
 *              Serviços (Avatar / Storage) e Controlador de Motion (60fps).
 */

import { createQuizStore, calculateQuizResult } from "./state/quizStore.js";
import { resolveAvatarAsset } from "./services/avatarService.js";
import { saveContactLocally, submitQuizTelemetry } from "./services/storageService.js";
import {
    formatBrazilianPhone,
    updateHudProgress,
    renderProfileStep,
    renderQuestionStep,
    renderQuizResult,
    syncInputValidationUI
} from "./ui/domRenderer.js";
import {
    animateStepExit,
    animateStepEnter,
    animateSelectionPulse,
    animateResultReveal
} from "./ui/motionController.js";

document.addEventListener("DOMContentLoaded", () => {
    const store = createQuizStore();
    const touchedInputs = new WeakMap();

    const quizSection = document.getElementById("quizSection");
    const quizHud = document.getElementById("quizHud");
    const stageContainer = document.getElementById("quizStage");
    const resultContainer = document.getElementById("resultado");

    if (!stageContainer || !resultContainer) {
        console.error("Elementos estruturais #quizStage ou #resultado ausentes no DOM.");
        return;
    }

    let isTransitioning = false;

    /**
     * Atualiza o estado habilitado/desabilitado do botão de avanço na etapa ativa.
     */
    const refreshNavigationButtonState = () => {
        const isValid = store.isStepValid();
        const nextBtn = document.getElementById("btnNextStep");
        const finishBtn = document.getElementById("btnFinishQuiz");

        if (nextBtn) nextBtn.disabled = !isValid;
        if (finishBtn) finishBtn.disabled = !isValid;
    };

    /**
     * Renderiza a etapa atual e dispara a coreografia de entrada.
     * @param {number} targetStep
     * @param {"forward" | "backward"} direction
     * @param {boolean} animateTransition
     */
    const goToStep = async (targetStep, direction = "forward", animateTransition = true) => {
        if (isTransitioning) return;
        isTransitioning = true;

        try {
            if (animateTransition) {
                await animateStepExit(stageContainer, direction);
            }

            const activeStep = store.setStep(targetStep);
            const currentState = store.getState();
            const stepValid = store.isStepValid(activeStep);

            updateHudProgress({
                currentStep: activeStep,
                totalSteps: currentState.totalQuestionSteps
            });

            if (activeStep === 0) {
                renderProfileStep(stageContainer, currentState.profile, stepValid);
            } else {
                renderQuestionStep(stageContainer, activeStep, currentState.answers, stepValid);
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            await animateStepEnter(stageContainer, direction);
        } finally {
            isTransitioning = false;
        }
    };

    /**
     * Finaliza o quiz, calcula o vencedor, resolve o avatar, salva contato e exibe o resultado.
     */
    const handleFinishQuiz = async () => {
        if (!store.isStepValid() || isTransitioning) return;
        isTransitioning = true;

        try {
            await animateStepExit(stageContainer, "forward");

            const currentState = store.getState();
            const quizResult = calculateQuizResult(currentState.answers);

            const avatar = resolveAvatarAsset({
                areaKey: quizResult.winnerKey,
                gender: currentState.profile.gender,
                skinTone: currentState.profile.skinTone,
                email: currentState.profile.email
            });

            // Atualiza o registro local com a área vencedora
            const updatedIndex = saveContactLocally({
                profile: currentState.profile,
                winnerKey: quizResult.winnerKey,
                existingIndex: currentState.contactRecordIndex
            });
            store.setContactRecordIndex(updatedIndex);

            // Envia os dados do aluno para o Supabase (/api/alunos) sem bloquear a UI
            submitQuizTelemetry({
                profile: currentState.profile,
                winnerKey: quizResult.winnerKey
            });

            if (quizSection) quizSection.hidden = true;
            if (quizHud) quizHud.hidden = true;

            resultContainer.hidden = false;

            renderQuizResult(resultContainer, {
                quizResult,
                avatar,
                profile: currentState.profile,
                onRestart: () => {
                    resultContainer.hidden = true;
                    if (quizSection) quizSection.hidden = false;
                    if (quizHud) quizHud.hidden = false;
                    goToStep(0, "backward", false);
                }
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
            animateResultReveal(resultContainer);
        } finally {
            isTransitioning = false;
        }
    };

    /* ======================================================================
       DELEGAÇÃO DE EVENTOS NO CONTAINER DO QUIZ (CLEAN & PERFORMANT)
       ====================================================================== */

    // 1. Entrada de texto em tempo real (Etapa 0)
    stageContainer.addEventListener("input", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;

        if (target.name === "phone") {
            target.value = formatBrazilianPhone(target.value);
        }

        if (["fullName", "nickname", "email", "age", "phone"].includes(target.name)) {
            store.updateProfileField(target.name, target.value);

            const interaction = touchedInputs.get(target) || { interacted: false, blurred: false };
            interaction.interacted = true;
            touchedInputs.set(target, interaction);

            if (interaction.blurred) {
                syncInputValidationUI(target, false);
            }

            refreshNavigationButtonState();
        }
    });

    // 2. Validação pós-interação ao sair do campo (blur)
    stageContainer.addEventListener(
        "blur",
        (event) => {
            const target = event.target;
            if (!(target instanceof HTMLInputElement)) return;

            if (["fullName", "nickname", "email", "age", "phone"].includes(target.name)) {
                const interaction = touchedInputs.get(target) || { interacted: false, blurred: false };
                interaction.blurred = true;
                touchedInputs.set(target, interaction);

                if (interaction.interacted || target.value.trim() !== "") {
                    syncInputValidationUI(target, true);
                }
            }
        },
        true
    );

    // 3. Seleção de opções (Gênero, Tom de Pele e Alternativas das Perguntas)
    stageContainer.addEventListener("change", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;

        if (target.name === "gender" || target.name === "skinTone") {
            store.updateProfileField(target.name, target.value);
            const visualCard = target.closest(".identity-option, .skin-option");
            animateSelectionPulse(visualCard);
            refreshNavigationButtonState();
            return;
        }

        const questionId = target.dataset.questionId;
        const optionId = target.dataset.optionId;
        if (questionId && optionId) {
            const isMultiple = target.dataset.multiple === "true";
            store.setQuestionAnswer(questionId, optionId, isMultiple, target.checked);

            const optionCard = target.closest(".option-card");
            animateSelectionPulse(optionCard);
            refreshNavigationButtonState();
        }
    });

    // 4. Cliques nos botões de navegação (Avançar, Voltar e Ver Pontuação)
    stageContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button || button.disabled) return;

        const { currentStep } = store.getState();

        if (button.id === "btnNextStep") {
            if (!store.isStepValid(currentStep)) return;

            if (currentStep === 0) {
                const currentState = store.getState();
                const savedIndex = saveContactLocally({
                    profile: currentState.profile,
                    existingIndex: currentState.contactRecordIndex
                });
                store.setContactRecordIndex(savedIndex);
            }

            goToStep(currentStep + 1, "forward", true);
            return;
        }

        if (button.id === "btnPrevStep") {
            if (currentStep > 0) {
                goToStep(currentStep - 1, "backward", true);
            }
            return;
        }

        if (button.id === "btnFinishQuiz") {
            handleFinishQuiz();
        }
    });

    // Inicializa na Etapa 0
    goToStep(0, "forward", false);
});

