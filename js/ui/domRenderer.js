/**
 * @file domRenderer.js
 * @description Camada de interface e manipulação otimizada do DOM via DocumentFragment.
 *              Isola completamente a criação de elementos HTML da lógica de negócios.
 */

import { IDENTITY_OPTIONS, QUIZ_QUESTIONS, SKIN_TONE_OPTIONS } from "../config/quizData.js";
import { validateProfileField } from "../state/quizStore.js";
import { formatAvatarDownloadFilename } from "../services/avatarService.js";
import { animateInvalidShake } from "./motionController.js";

/**
 * Formata um número de telefone brasileiro no padrão (DD) 99999-9999.
 * @param {string} rawValue
 * @returns {string}
 */
export const formatBrazilianPhone = (rawValue) => {
    const digits = String(rawValue ?? "").replace(/\D/g, "").slice(0, 11);

    if (digits.length > 10) {
        return digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }
    if (digits.length > 6) {
        return digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }
    if (digits.length > 2) {
        return digits.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    }
    if (digits.length > 0) {
        return digits.replace(/^(\d{0,2}).*/, "($1");
    }
    return "";
};

/**
 * Atualiza o HUD superior de progresso usando `transform: scaleX()` (60fps).
 * @param {Object} params
 * @param {number} params.currentStep
 * @param {number} params.totalSteps
 */
export const updateHudProgress = ({ currentStep, totalSteps }) => {
    const hudSection = document.getElementById("quizHud");
    const stepLabel = document.getElementById("hudStepLabel");
    const stepBadge = document.getElementById("hudStepBadge");
    const progressBar = document.getElementById("hudProgressBar");
    const progressTrack = document.getElementById("hudProgressTrack");

    if (!hudSection || !stepLabel || !stepBadge || !progressBar) return;

    const totalStages = totalSteps + 1; // Etapa 0 + 10 perguntas = 11 estágios
    const currentStage = currentStep + 1;
    const ratio = Math.min(Math.max(currentStage / totalStages, 0.08), 1);
    const percentage = Math.round(ratio * 100);

    if (currentStep === 0) {
        stepLabel.textContent = "Criação de Personagem";
        stepBadge.innerHTML = `<i class="bi bi-person-badge" aria-hidden="true"></i> Etapa Inicial`;
    } else {
        stepLabel.textContent = `Missão de Perfil`;
        stepBadge.innerHTML = `<i class="bi bi-lightning-charge-fill" aria-hidden="true"></i> Pergunta ${String(currentStep).padStart(2, "0")} / ${totalSteps}`;
    }

    progressBar.style.transform = `scaleX(${ratio})`;
    if (progressTrack) {
        progressTrack.setAttribute("aria-valuenow", String(percentage));
    }
};

/**
 * Renderiza a Etapa 0 (Dados Pessoais do Aventureiro) usando DocumentFragment.
 * @param {HTMLElement} stageContainer
 * @param {Object} profileState
 * @param {boolean} isValid
 */
export const renderProfileStep = (stageContainer, profileState, isValid) => {
    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement("div");

    const identityCardsHtml = IDENTITY_OPTIONS.map((opt) => {
        const isChecked = profileState.gender === opt.value ? "checked" : "";
        return `
            <div class="identity-option" data-stagger>
                <input
                    type="radio"
                    class="identity-option__input"
                    name="gender"
                    id="${opt.id}"
                    value="${opt.value}"
                    ${isChecked}
                    required
                >
                <label class="identity-option__card ${opt.variantClass}" for="${opt.id}">
                    <i class="bi ${opt.iconClass} identity-option__icon" aria-hidden="true"></i>
                    <span class="identity-option__text">${opt.label}</span>
                </label>
            </div>
        `;
    }).join("");

    const skinCardsHtml = SKIN_TONE_OPTIONS.map((skin) => {
        const isChecked = profileState.skinTone === skin.value ? "checked" : "";
        return `
            <label class="skin-option" for="${skin.id}" data-stagger>
                <input
                    type="radio"
                    class="skin-option__input"
                    name="skinTone"
                    id="${skin.id}"
                    value="${skin.value}"
                    ${isChecked}
                    required
                >
                <span class="skin-option__swatch ${skin.swatchClass}">
                    <span class="skin-option__gloss"></span>
                </span>
                <span class="skin-option__label">${skin.label}</span>
            </label>
        `;
    }).join("");

    wrapper.innerHTML = `
        <h2 class="quiz-card__title">Seus Dados de Aventureiro</h2>

        <div class="form-grid" id="profileFormFields">
            <div class="field" data-stagger>
                <label for="fullName" class="field__label">
                    <i class="bi bi-person-vcard" aria-hidden="true"></i>
                    Nome Completo
                </label>
                <span id="fullNameHint" class="field__hint">Digite seu nome e sobrenome (mínimo de 9 caracteres)</span>
                <input
                    type="text"
                    class="field__input"
                    id="fullName"
                    name="fullName"
                    placeholder="Digite seu nome completo"
                    autocomplete="name"
                    minlength="9"
                    value="${escapeHtml(profileState.fullName)}"
                    aria-describedby="fullNameHint"
                    aria-errormessage="fullNameError"
                    required
                >
                <div id="fullNameError" class="field__error" role="alert">
                    <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                    Informe seu nome completo (mais de 8 caracteres).
                </div>
            </div>

            <div class="field" data-stagger>
                <label for="nickname" class="field__label">
                    <i class="bi bi-controller" aria-hidden="true"></i>
                    Como quer ser chamado no jogo?
                </label>
                <span id="nicknameHint" class="field__hint">Seu codinome ou apelido que aparecerá no card do avatar</span>
                <input
                    type="text"
                    class="field__input"
                    id="nickname"
                    name="nickname"
                    placeholder="Digite seu apelido ou nickname"
                    autocomplete="nickname"
                    value="${escapeHtml(profileState.nickname)}"
                    aria-describedby="nicknameHint"
                    aria-errormessage="nicknameError"
                    required
                >
                <div id="nicknameError" class="field__error" role="alert">
                    <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                    Escolha um apelido para o seu personagem.
                </div>
            </div>

            <div class="field" data-stagger>
                <label for="email" class="field__label">
                    <i class="bi bi-envelope-at" aria-hidden="true"></i>
                    E-mail
                </label>
                <span id="emailHint" class="field__hint">Usado para gerar a semente única do seu Avatar RPG</span>
                <input
                    type="email"
                    class="field__input"
                    id="email"
                    name="email"
                    placeholder="seuemail@exemplo.com"
                    autocomplete="email"
                    value="${escapeHtml(profileState.email)}"
                    aria-describedby="emailHint"
                    aria-errormessage="emailError"
                    required
                >
                <div id="emailError" class="field__error" role="alert">
                    <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                    Digite um endereço de e-mail válido.
                </div>
            </div>

            <div class="form-grid__row-split" data-stagger>
                <div class="field">
                    <label for="age" class="field__label">
                        <i class="bi bi-calendar3" aria-hidden="true"></i>
                        Idade
                    </label>
                    <span id="ageHint" class="field__hint">Entre 10 e 99 anos</span>
                    <input
                        type="number"
                        class="field__input"
                        id="age"
                        name="age"
                        placeholder="Ex: 17"
                        min="10"
                        max="99"
                        inputmode="numeric"
                        value="${escapeHtml(profileState.age)}"
                        aria-describedby="ageHint"
                        aria-errormessage="ageError"
                        required
                    >
                    <div id="ageError" class="field__error" role="alert">
                        <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                        Idade entre 10 e 99.
                    </div>
                </div>

                <div class="field">
                    <label for="phone" class="field__label">
                        <i class="bi bi-whatsapp" aria-hidden="true"></i>
                        Celular / WhatsApp
                    </label>
                    <span id="phoneHint" class="field__hint">DDD + número (10 ou 11 dígitos)</span>
                    <input
                        type="tel"
                        class="field__input"
                        id="phone"
                        name="phone"
                        placeholder="(17) 99999-9999"
                        maxlength="15"
                        inputmode="tel"
                        autocomplete="tel"
                        pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}"
                        value="${escapeHtml(profileState.phone)}"
                        aria-describedby="phoneHint"
                        aria-errormessage="phoneError"
                        required
                    >
                    <div id="phoneError" class="field__error" role="alert">
                        <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                        Informe um número com DDD válido.
                    </div>
                </div>
            </div>

            <fieldset data-stagger>
                <legend class="section-label">Como você se identifica?</legend>
                <div class="identity-grid">
                    ${identityCardsHtml}
                </div>
            </fieldset>

            <fieldset data-stagger>
                <legend class="section-label">Tom de Pele do Avatar</legend>
                <div class="skin-selector">
                    ${skinCardsHtml}
                </div>
            </fieldset>
        </div>

        <div class="quiz-nav quiz-nav--end">
            <button
                type="button"
                class="btn-nav btn-nav--next"
                id="btnNextStep"
                aria-label="Avançar para a primeira pergunta"
                ${isValid ? "" : "disabled"}
            >
                <span>Iniciar Jornada</span>
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    `;

    while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
    }

    stageContainer.replaceChildren(fragment);
};

/**
 * Renderiza uma pergunta do Quiz (Etapas 1 a 10) usando DocumentFragment.
 * @param {HTMLElement} stageContainer
 * @param {number} stepNumber
 * @param {Record<string, string[]>} answersMap
 * @param {boolean} isStepValid
 */
export const renderQuestionStep = (stageContainer, stepNumber, answersMap, isStepValid) => {
    const question = QUIZ_QUESTIONS.find((q) => q.step === stepNumber);
    if (!question) return;

    const selectedIds = answersMap[question.id] ?? [];
    const isMultiple = question.type === "multiple";
    const inputType = isMultiple ? "checkbox" : "radio";
    const isFinalQuestion = stepNumber === QUIZ_QUESTIONS.length;

    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement("div");

    const optionsHtml = question.options
        .map((opt) => {
            const isChecked = selectedIds.includes(opt.id) ? "checked" : "";
            return `
                <label class="option-card" for="${opt.id}" data-stagger>
                    <input
                        class="option-card__input"
                        type="${inputType}"
                        name="${question.id}"
                        id="${opt.id}"
                        value="${opt.value}"
                        data-question-id="${question.id}"
                        data-option-id="${opt.id}"
                        data-multiple="${isMultiple}"
                        ${isChecked}
                    >
                    <span class="option-card__text">${opt.label}</span>
                </label>
            `;
        })
        .join("");

    const hintBadgeHtml = question.hint
        ? `<div class="quiz-card__hint">
               <i class="bi bi-check2-square" aria-hidden="true"></i>
               <span>${question.hint}</span>
           </div>`
        : "";

    const nextButtonHtml = isFinalQuestion
        ? `<button
               type="button"
               class="btn-nav btn-nav--finish"
               id="btnFinishQuiz"
               ${isStepValid ? "" : "disabled"}
           >
               <i class="bi bi-trophy-fill" aria-hidden="true"></i>
               <span>Ver Pontuação</span>
           </button>`
        : `<button
               type="button"
               class="btn-nav btn-nav--next"
               id="btnNextStep"
               aria-label="Próxima pergunta"
               ${isStepValid ? "" : "disabled"}
           >
               <span>Próxima</span>
               <i class="bi bi-arrow-right" aria-hidden="true"></i>
           </button>`;

    wrapper.innerHTML = `
        <fieldset>
            <legend class="quiz-card__question-title">${question.title}</legend>
            ${hintBadgeHtml}
            <div class="options-grid">
                ${optionsHtml}
            </div>
        </fieldset>

        <div class="quiz-nav">
            <button
                type="button"
                class="btn-nav btn-nav--back"
                id="btnPrevStep"
                aria-label="Voltar para a etapa anterior"
            >
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
                <span>Voltar</span>
            </button>
            ${nextButtonHtml}
        </div>
    `;

    while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
    }

    stageContainer.replaceChildren(fragment);
};

/**
 * Renderiza o Cartão RPG de Resultado Final com Bootstrap Icons e Avatar.
 * @param {HTMLElement} resultContainer
 * @param {Object} params
 * @param {Object} params.quizResult
 * @param {Object|null} params.avatar
 * @param {Object} params.profile
 * @param {Function} params.onRestart
 */
export const renderQuizResult = (resultContainer, { quizResult, avatar, profile, onRestart }) => {
    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement("div");
    wrapper.className = "result-layout";

    const playerName = String(profile.nickname || "Aventureiro").trim();

    const xpRowsHtml = quizResult.breakdown
        .map(
            (item) => `
            <div
                class="xp-row"
                data-xp-row
                data-xp-ratio="${item.ratio}"
                data-xp-points="${item.xp}"
            >
                <div class="xp-row__class">
                    <span class="xp-row__icon" aria-hidden="true">
                        <i class="bi ${item.iconClass}"></i>
                    </span>
                    <span>${item.name}</span>
                </div>

                <div class="xp-row__meter">
                    <div class="xp-row__track" role="progressbar" aria-label="XP em ${item.name}" aria-valuemin="0" aria-valuemax="50" aria-valuenow="${item.xp}">
                        <div class="xp-row__fill" data-xp-fill></div>
                    </div>
                    <span class="xp-row__value" data-xp-value>0 XP</span>
                </div>
            </div>
        `
        )
        .join("");

    wrapper.innerHTML = `
        <div class="result-layout__sidebar">
            <div class="rpg-panel avatar-showcase" data-result-panel id="avatarCard">
                <div class="avatar-showcase__frame" id="avatarFrame"></div>
                <p class="avatar-showcase__nickname">${escapeHtml(playerName)}</p>
            </div>

            <button
                type="button"
                class="btn-action"
                id="btnDownloadAvatar"
                data-result-panel
            >
                <i class="bi bi-download" aria-hidden="true"></i>
                <span>Baixar minha imagem</span>
            </button>

            <button
                type="button"
                class="btn-action btn-action--secondary"
                id="btnRestartQuiz"
                data-result-panel
            >
                <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                <span>Refazer Quiz</span>
            </button>
        </div>

        <div class="result-layout__main">
            <article class="rpg-panel winner-banner" data-result-panel>
                <div class="winner-banner__icon-badge" aria-hidden="true">
                    <i class="bi ${quizResult.winnerClass.iconClass}"></i>
                </div>
                <p class="winner-banner__eyebrow">Sua Classe DevSide</p>
                <h2 class="winner-banner__title">${quizResult.winnerClass.name}</h2>
                <output class="winner-banner__xp" data-winner-xp="${quizResult.winnerXp}">
                    0 XP
                </output>
                <p class="winner-banner__desc">${quizResult.primaryDescription}</p>
                <p class="winner-banner__desc">${quizResult.secondaryDescription}</p>
            </article>

            <section class="rpg-panel stats-board" data-result-panel aria-label="Atributos do Personagem">
                <header class="stats-board__header">
                    <i class="bi bi-stars" aria-hidden="true"></i>
                    <span>Atributos do Personagem</span>
                </header>
                <div>
                    ${xpRowsHtml}
                </div>
            </section>
        </div>
    `;

    fragment.appendChild(wrapper);
    resultContainer.replaceChildren(fragment);

    // Configura a imagem do avatar com fallback automático de capitalização
    const avatarFrame = resultContainer.querySelector("#avatarFrame");
    const downloadBtn = resultContainer.querySelector("#btnDownloadAvatar");
    const restartBtn = resultContainer.querySelector("#btnRestartQuiz");

    if (restartBtn && typeof onRestart === "function") {
        restartBtn.addEventListener("click", onRestart);
    }

    if (!avatar || !avatarFrame) {
        if (downloadBtn) downloadBtn.disabled = true;
        return;
    }

    const imgEl = document.createElement("img");
    imgEl.className = "avatar-showcase__img";
    imgEl.src = avatar.imagePath;
    imgEl.alt = `Avatar DevSide da classe ${avatar.areaName}`;
    let triedFallback = false;

    imgEl.addEventListener("load", () => {
        imgEl.classList.add("avatar-showcase__img--loaded");
    });

    imgEl.addEventListener("error", () => {
        if (!triedFallback && avatar.fallbackImagePath && avatar.fallbackImagePath !== imgEl.src) {
            triedFallback = true;
            avatar.imagePath = avatar.fallbackImagePath;
            imgEl.src = avatar.fallbackImagePath;
            return;
        }
        avatarFrame.innerHTML = `
            <p class="field__hint">
                <i class="bi bi-image" aria-hidden="true"></i>
                Sprite não encontrado (${escapeHtml(avatar.imagePath)})
            </p>
        `;
        if (downloadBtn) {
            downloadBtn.disabled = true;
        }
    });

    avatarFrame.appendChild(imgEl);

    if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = avatar.imagePath;
            link.download = formatAvatarDownloadFilename(playerName, avatar.areaName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }
};

/**
 * Sincroniza o estado visual de validação e o atributo `aria-invalid` após interação.
 * @param {HTMLInputElement} inputElement
 */
export const syncInputValidationUI = (inputElement, triggerShake = false) => {
    if (!inputElement || !inputElement.name) return;

    const isValid = validateProfileField(inputElement.name, inputElement.value);

    // Mantém compatibilidade com custom validation e :user-invalid
    inputElement.setCustomValidity(isValid ? "" : "Campo inválido");
    inputElement.classList.toggle("is-invalid", !isValid);
    inputElement.classList.toggle("is-valid", isValid);
    inputElement.setAttribute("aria-invalid", isValid ? "false" : "true");

    if (!isValid && triggerShake) {
        animateInvalidShake(inputElement);
    }
};

/**
 * Escapa caracteres especiais para inserção segura em atributos HTML.
 * @param {string} unsafeText
 * @returns {string}
 */
const escapeHtml = (unsafeText) =>
    String(unsafeText ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
