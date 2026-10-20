/**
 * @file motionController.js
 * @description Motor de animações de alta performance (60fps+ GPU-only).
 *              Utiliza Web Animations API (WAAPI) e requestAnimationFrame,
 *              animando estritamente `transform` e `opacity` e respeitando
 *              `prefers-reduced-motion`.
 */

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * Verifica se o usuário prefere movimento reduzido.
 * @returns {boolean}
 */
export const prefersReducedMotion = () => reducedMotionQuery.matches;

/**
 * Aguarda o término seguro de uma animação WAAPI.
 * @param {Animation} animation
 * @returns {Promise<void>}
 */
const waitForAnimation = async (animation) => {
    try {
        await animation.finished;
    } catch {
        // Ignora cancelamentos intencionais de animação
    }
};

/**
 * Anima a saída do container atual antes da troca de etapa.
 * @param {HTMLElement} container
 * @param {"forward" | "backward"} direction
 * @returns {Promise<void>}
 */
export const animateStepExit = async (container, direction = "forward") => {
    if (!container || prefersReducedMotion()) return;

    const offsetX = direction === "forward" ? -28 : 28;
    const animation = container.animate(
        [
            { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            { opacity: 0, transform: `translate3d(${offsetX}px, 0, 0) scale(0.985)` }
        ],
        {
            duration: 210,
            easing: EASE_IN_OUT,
            fill: "forwards"
        }
    );

    await waitForAnimation(animation);
};

/**
 * Anima a entrada do container da nova etapa e aplica staggering nos elementos filhos.
 * @param {HTMLElement} container
 * @param {"forward" | "backward"} direction
 * @returns {Promise<void>}
 */
export const animateStepEnter = async (container, direction = "forward") => {
    if (!container) return;

    if (prefersReducedMotion()) {
        container.style.opacity = "1";
        container.style.transform = "none";
        return;
    }

    const offsetX = direction === "forward" ? 32 : -32;

    const cardAnimation = container.animate(
        [
            { opacity: 0, transform: `translate3d(${offsetX}px, 0, 0) scale(0.985)` },
            { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }
        ],
        {
            duration: 360,
            easing: EASE_OUT_EXPO,
            fill: "forwards"
        }
    );

    // Coreografia Visual (Staggering): anima alternativas ou campos em cascata
    const staggerTargets = container.querySelectorAll("[data-stagger]");
    staggerTargets.forEach((item, index) => {
        item.animate(
            [
                { opacity: 0, transform: "translate3d(0, 14px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" }
            ],
            {
                duration: 380,
                delay: 45 + index * 45,
                easing: EASE_OUT_EXPO,
                fill: "backwards"
            }
        );
    });

    await waitForAnimation(cardAnimation);
    container.style.opacity = "";
    container.style.transform = "";
};

/**
 * Micro-interação física (Spring Pulse) ao selecionar uma alternativa ou card.
 * @param {HTMLElement} element
 */
export const animateSelectionPulse = (element) => {
    if (!element || prefersReducedMotion()) return;

    element.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(0.975)" },
            { transform: "scale(1.015)" },
            { transform: "scale(1)" }
        ],
        {
            duration: 280,
            easing: EASE_SPRING
        }
    );
};

/**
 * Animação física de feedback de erro (Shake horizontal via transform).
 * @param {HTMLElement} element
 */
export const animateInvalidShake = (element) => {
    if (!element || prefersReducedMotion()) return;

    element.animate(
        [
            { transform: "translate3d(0, 0, 0)" },
            { transform: "translate3d(-6px, 0, 0)" },
            { transform: "translate3d(6px, 0, 0)" },
            { transform: "translate3d(-4px, 0, 0)" },
            { transform: "translate3d(4px, 0, 0)" },
            { transform: "translate3d(0, 0, 0)" }
        ],
        {
            duration: 340,
            easing: EASE_IN_OUT
        }
    );
};

/**
 * Interpola um contador numérico de 0 até `targetValue` usando requestAnimationFrame.
 * @param {HTMLElement} element
 * @param {number} targetValue
 * @param {string} [suffix=" XP"]
 * @param {number} [durationMs=900]
 */
export const animateNumberCounter = (element, targetValue, suffix = " XP", durationMs = 900) => {
    if (!element) return;

    if (prefersReducedMotion() || durationMs <= 0) {
        element.textContent = `${targetValue}${suffix}`;
        return;
    }

    const startTime = performance.now();

    const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Curva Ease-Out Quart: 1 - (1 - t)^4
        const eased = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(targetValue * eased);

        element.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = `${targetValue}${suffix}`;
        }
    };

    requestAnimationFrame(tick);
};

/**
 * Coreografa a entrada da tela de resultado RPG, barras de XP (`scaleX`) e contadores.
 * @param {HTMLElement} resultContainer
 */
export const animateResultReveal = (resultContainer) => {
    if (!resultContainer) return;

    const panels = resultContainer.querySelectorAll("[data-result-panel]");
    const xpRows = resultContainer.querySelectorAll("[data-xp-row]");
    const winnerXpEl = resultContainer.querySelector("[data-winner-xp]");

    if (!prefersReducedMotion()) {
        panels.forEach((panel, index) => {
            panel.animate(
                [
                    { opacity: 0, transform: "translate3d(0, 24px, 0) scale(0.98)" },
                    { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }
                ],
                {
                    duration: 520,
                    delay: index * 110,
                    easing: EASE_OUT_EXPO,
                    fill: "backwards"
                }
            );
        });
    }

    if (winnerXpEl) {
        const targetWinnerXp = Number(winnerXpEl.dataset.winnerXp || 0);
        animateNumberCounter(winnerXpEl, targetWinnerXp, " XP", 950);
    }

    xpRows.forEach((row, index) => {
        const fillBar = row.querySelector("[data-xp-fill]");
        const valueLabel = row.querySelector("[data-xp-value]");
        const targetRatio = Number(row.dataset.xpRatio || 0);
        const targetXp = Number(row.dataset.xpPoints || 0);

        if (fillBar) {
            if (prefersReducedMotion()) {
                fillBar.style.transform = `scaleX(${targetRatio})`;
            } else {
                fillBar.animate(
                    [
                        { transform: "scaleX(0)" },
                        { transform: `scaleX(${targetRatio})` }
                    ],
                    {
                        duration: 880,
                        delay: 240 + index * 95,
                        easing: EASE_OUT_EXPO,
                        fill: "forwards"
                    }
                );
            }
        }

        if (valueLabel) {
            setTimeout(() => {
                animateNumberCounter(valueLabel, targetXp, " XP", 820);
            }, prefersReducedMotion() ? 0 : 240 + index * 95);
        }
    });
};

