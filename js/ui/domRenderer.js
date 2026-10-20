/**
 * @file domRenderer.js
 * @description Camada de interface e manipulação otimizada do DOM via DocumentFragment.
 *              Isola completamente a criação de elementos HTML da lógica de negócios.
 */

import {
    IDENTITY_OPTIONS,
    QUIZ_QUESTIONS_BY_TRACK,
    SKIN_TONE_OPTIONS,
    TRACK_OPTIONS
} from "../config/quizData.js";
import { validateProfileField } from "../state/quizStore.js";
import {
    buildAvatarRescueQrData,
    formatAvatarDownloadFilename,
    renderCollectibleAvatarCard
} from "../services/avatarService.js";
import { animateInvalidShake, attachReflectiveCardEffect } from "./motionController.js";

/**
 * Detecta se o usuário está acessando por um dispositivo móvel (celular/tablet).
 * @returns {boolean}
 */
const isMobileViewportOrTouch = () =>
    window.matchMedia("(max-width: 768px), (hover: none) and (pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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

    const trackCardsHtml = TRACK_OPTIONS.map((trk) => {
        const isChecked = profileState.track === trk.value ? "checked" : "";
        return `
            <div class="identity-option" data-stagger>
                <input
                    type="radio"
                    class="identity-option__input"
                    name="track"
                    id="${trk.id}"
                    value="${trk.value}"
                    ${isChecked}
                    required
                >
                <label class="identity-option__card ${trk.variantClass}" for="${trk.id}">
                    <i class="bi ${trk.iconClass} identity-option__icon" aria-hidden="true"></i>
                    <span class="identity-option__text">${trk.label}</span>
                    <span class="identity-option__subtitle">${trk.subtitle}</span>
                </label>
            </div>
        `;
    }).join("");

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
            <fieldset data-stagger>
                <legend class="section-label">Qual área mais desperta seu interesse hoje?</legend>
                <div class="identity-grid">
                    ${trackCardsHtml}
                </div>
            </fieldset>

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
export const renderQuestionStep = (stageContainer, stepNumber, answersMap, isStepValid, track = "ti") => {
    const questions = QUIZ_QUESTIONS_BY_TRACK[track] || QUIZ_QUESTIONS_BY_TRACK.ti;
    const question = questions.find((q) => q.step === stepNumber);
    if (!question) return;

    const selectedIds = answersMap[question.id] ?? [];
    const isMultiple = question.type === "multiple";
    const inputType = isMultiple ? "checkbox" : "radio";
    const isFinalQuestion = stepNumber === questions.length;

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

    const isMobile = isMobileViewportOrTouch();
    const downloadLabel = isMobile ? "Baixar Meu Card" : "Baixar neste computador";
    const downloadBtnVariant = isMobile ? "btn-action" : "btn-action btn-action--secondary";

    wrapper.innerHTML = `
        <div class="result-layout__sidebar">
            <div class="rpg-panel avatar-showcase" data-result-panel id="avatarCard">
                <div class="reflective-card" id="reflectiveCardContainer">
                    <img
                        class="reflective-card__img"
                        id="collectibleCardImg"
                        alt="Card Colecionável DevSide"
                    >
                    <div class="reflective-card__sheen" aria-hidden="true"></div>
                    <div class="reflective-card__glare" aria-hidden="true"></div>
                </div>
            </div>

            <div class="rpg-panel qr-rescue" data-result-panel id="qrRescuePanel" ${isMobile ? "hidden" : ""}>
                <div class="qr-rescue__header">
                    <i class="bi bi-qr-code-scan" aria-hidden="true"></i>
                    <span>Baixar pelo Celular</span>
                </div>
                <div class="qr-rescue__box">
                    <img
                        class="qr-rescue__img"
                        id="qrRescueImg"
                        alt="QR Code para resgatar seu Card Avatar no celular"
                        width="176"
                        height="176"
                    >
                </div>
                <p class="qr-rescue__caption">
                    Aponte a câmera do seu celular para abrir seu Card Colecionável e salvar na galeria.
                </p>
            </div>

            <button
                type="button"
                class="${downloadBtnVariant}"
                id="btnDownloadCard"
                data-result-panel
                disabled
            >
                <i class="bi bi-download" aria-hidden="true"></i>
                <span>${downloadLabel}</span>
            </button>

            <button
                type="button"
                class="btn-action btn-action--secondary"
                id="btnShareCard"
                data-result-panel
                hidden
            >
                <i class="bi bi-share-fill" aria-hidden="true"></i>
                <span>Compartilhar (WhatsApp / Stories)</span>
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

    const reflectiveCard = resultContainer.querySelector("#reflectiveCardContainer");
    const cardImg = resultContainer.querySelector("#collectibleCardImg");
    const qrRescuePanel = resultContainer.querySelector("#qrRescuePanel");
    const qrRescueImg = resultContainer.querySelector("#qrRescueImg");
    const downloadBtn = resultContainer.querySelector("#btnDownloadCard");
    const shareBtn = resultContainer.querySelector("#btnShareCard");
    const restartBtn = resultContainer.querySelector("#btnRestartQuiz");

    if (restartBtn && typeof onRestart === "function") {
        restartBtn.addEventListener("click", onRestart);
    }

    if (!avatar || !reflectiveCard || !cardImg) {
        if (qrRescuePanel) qrRescuePanel.hidden = true;
        return;
    }

    attachReflectiveCardEffect(reflectiveCard);

    const { rescueUrl, qrCodeImageUrl } = buildAvatarRescueQrData(avatar, playerName);
    if (qrRescueImg && !isMobile) {
        qrRescueImg.src = qrCodeImageUrl;
    }

    const filename = formatAvatarDownloadFilename(playerName, avatar.areaName);
    let generatedBlob = null;
    let generatedDataUrl = "";

    renderCollectibleAvatarCard({ avatar, nickname: playerName })
        .then(({ dataUrl, blob }) => {
            generatedDataUrl = dataUrl;
            generatedBlob = blob;
            cardImg.src = dataUrl;
            cardImg.alt = `Card DevSide Seja Fatec de ${playerName} — ${avatar.areaName}`;

            if (downloadBtn) {
                downloadBtn.disabled = false;
            }

            if (isMobile && typeof navigator.share === "function" && shareBtn && blob) {
                shareBtn.hidden = false;
            }
        })
        .catch(() => {
            cardImg.onerror = () => {
                if (avatar.fallbackImagePath) {
                    cardImg.src = encodeURI(avatar.fallbackImagePath);
                }
            };
            cardImg.src = encodeURI(avatar.imagePath);
        });

    downloadBtn?.addEventListener("click", () => {
        if (generatedBlob) {
            const blobUrl = URL.createObjectURL(generatedBlob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
            return;
        }

        if (generatedDataUrl) {
            const link = document.createElement("a");
            link.href = generatedDataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    });

    shareBtn?.addEventListener("click", async () => {
        if (!generatedBlob || typeof navigator.share !== "function") return;
        try {
            const file = new File([generatedBlob], filename, { type: "image/png" });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: `Meu Card DevSide — Seja Fatec (${avatar.areaName})`,
                    text: `Eu fui no Seja Fatec e descobri minha classe no DevSide: ${avatar.areaName}!`,
                    files: [file]
                });
                return;
            }
            await navigator.share({
                title: `Meu Card DevSide — Seja Fatec (${avatar.areaName})`,
                text: `Eu fui no Seja Fatec e descobri minha classe no DevSide: ${avatar.areaName}!`,
                url: rescueUrl
            });
        } catch {
            // Cancelamento pelo usuário não é erro
        }
    });
};

const DEFAULT_FIELD_ERRORS = Object.freeze({
    fullName: "Informe seu nome e sobrenome completos (apenas letras, mín. 9 caracteres).",
    nickname: "Escolha um apelido entre 2 e 24 caracteres.",
    email: "Digite um endereço de e-mail válido.",
    age: "Idade entre 10 e 99.",
    phone: "Informe um celular válido com DDD (ex: (17) 99123-4567)."
});

/**
 * Sincroniza o estado visual de validação e o atributo `aria-invalid` após interação.
 * @param {HTMLInputElement} inputElement
 * @param {boolean} [triggerShake=false]
 */
export const syncInputValidationUI = (inputElement, triggerShake = false) => {
    if (!inputElement || !inputElement.name) return;

    const isValid = validateProfileField(inputElement.name, inputElement.value);
    const errorEl = document.getElementById(`${inputElement.name}Error`);

    if (errorEl && DEFAULT_FIELD_ERRORS[inputElement.name]) {
        errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i> <span></span>`;
        const span = errorEl.querySelector("span");
        if (span) span.textContent = DEFAULT_FIELD_ERRORS[inputElement.name];
    }

    inputElement.setCustomValidity(isValid ? "" : "Campo inválido");
    inputElement.classList.toggle("is-invalid", !isValid);
    inputElement.classList.toggle("is-valid", isValid);
    inputElement.setAttribute("aria-invalid", isValid ? "false" : "true");

    if (!isValid && triggerShake) {
        animateInvalidShake(inputElement);
    }
};

/**
 * Exibe um erro customizado (ex: E-mail ou Celular duplicado no banco) no campo correspondente.
 * @param {string} fieldName
 * @param {string} customMessage
 */
export const markFieldWithCustomError = (fieldName, customMessage) => {
    const inputElement = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}Error`);
    if (!inputElement) return;

    if (errorEl) {
        errorEl.innerHTML = `<i class="bi bi-shield-exclamation" aria-hidden="true"></i> <span></span>`;
        const span = errorEl.querySelector("span");
        if (span) span.textContent = customMessage;
    }

    inputElement.setCustomValidity(customMessage);
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    inputElement.setAttribute("aria-invalid", "true");
    inputElement.focus();
    animateInvalidShake(inputElement);
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
