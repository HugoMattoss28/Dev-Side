/**
 * @file quizStore.js
 * @description Gerenciamento de estado centralizado e funções puras para validação
 *              e cálculo de pontuação (XP) do Quiz DevSide.
 */

import { QUIZ_QUESTIONS, RPG_CLASSES } from "../config/quizData.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FULL_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
const HIGH_XP_THRESHOLD = 30;
const MAX_XP_REFERENCE = 50;

/**
 * Valida individualmente um campo dos dados pessoais.
 * @param {string} fieldName
 * @param {string} rawValue
 * @returns {boolean}
 */
export const validateProfileField = (fieldName, rawValue) => {
    const value = String(rawValue ?? "").trim();

    switch (fieldName) {
        case "fullName": {
            const normalized = value.replace(/\s+/g, " ");
            // Exige mais de 8 caracteres, pelo menos Nome + Sobrenome e apenas letras
            if (normalized.length <= 8 || !FULL_NAME_REGEX.test(normalized)) return false;
            // Bloqueia sequências falsas de uma única letra repetida (ex: "aaaaa aaaaa")
            const lettersOnly = normalized.replace(/\s/g, "").toLowerCase();
            if (/^([a-zà-ÿ])\1+$/.test(lettersOnly)) return false;
            return true;
        }
        case "nickname":
            return value.length >= 2 && value.length <= 24;
        case "email":
            return EMAIL_REGEX.test(value);
        case "age": {
            const ageNumber = Number(value);
            return value !== "" && Number.isInteger(ageNumber) && ageNumber >= 10 && ageNumber <= 99;
        }
        case "phone": {
            const digitsOnly = value.replace(/\D/g, "");
            if (digitsOnly.length < 10 || digitsOnly.length > 11) return false;
            const ddd = Number(digitsOnly.slice(0, 2));
            if (ddd < 11 || ddd > 99) return false;
            const localNumber = digitsOnly.slice(2);
            // Bloqueia números repetidos falsos como 999999999 ou 111111111
            if (/^(\d)\1+$/.test(localNumber)) return false;
            return true;
        }
        case "gender":
            return ["masculino", "feminino", "trans"].includes(value);
        case "skinTone":
            return ["clara", "escura"].includes(value);
        default:
            return false;
    }
};

/**
 * Verifica se todos os dados pessoais obrigatórios da Etapa 0 estão válidos.
 * @param {Object} profile
 * @returns {boolean}
 */
export const isProfileComplete = (profile) =>
    validateProfileField("fullName", profile.fullName) &&
    validateProfileField("nickname", profile.nickname) &&
    validateProfileField("email", profile.email) &&
    validateProfileField("age", profile.age) &&
    validateProfileField("phone", profile.phone) &&
    validateProfileField("gender", profile.gender) &&
    validateProfileField("skinTone", profile.skinTone);

/**
 * Calcula a pontuação completa (XP) e determina a classe principal e secundária.
 * Função pura: recebe apenas o mapa de respostas e retorna o resultado estruturado.
 * @param {Record<string, string[]>} answersMap
 * @returns {Object}
 */
export const calculateQuizResult = (answersMap) => {
    const totals = {
        programacao: 0,
        design: 0,
        redes: 0,
        seguranca: 0
    };

    for (const question of QUIZ_QUESTIONS) {
        const selectedOptionIds = answersMap[question.id] ?? [];

        for (const optionId of selectedOptionIds) {
            const matchedOption = question.options.find((opt) => opt.id === optionId);
            if (!matchedOption) continue;

            for (const [classKey, points] of Object.entries(matchedOption.scores)) {
                totals[classKey] += points;
            }
        }
    }

    const classKeys = Object.keys(RPG_CLASSES);

    // Descobre a classe vencedora mantendo a mesma regra de desempate original
    let winnerKey = "programacao";
    for (const key of classKeys) {
        if (totals[key] > totals[winnerKey]) {
            winnerKey = key;
        }
    }

    // Descobre a segunda classe com maior XP
    let runnerUpKey = null;
    for (const key of classKeys) {
        if (key === winnerKey) continue;
        if (runnerUpKey === null || totals[key] > totals[runnerUpKey]) {
            runnerUpKey = key;
        }
    }

    const winnerClass = RPG_CLASSES[winnerKey];
    const runnerUpClass = RPG_CLASSES[runnerUpKey];

    const winnerXp = totals[winnerKey];
    const runnerUpXp = totals[runnerUpKey];

    const primaryDescription =
        winnerXp >= HIGH_XP_THRESHOLD
            ? winnerClass.descriptions.primaryHigh
            : winnerClass.descriptions.primaryNormal;

    const secondaryDescription =
        runnerUpXp >= HIGH_XP_THRESHOLD
            ? runnerUpClass.descriptions.secondaryHigh
            : runnerUpClass.descriptions.secondaryNormal;

    const breakdown = classKeys.map((key) => {
        const xp = totals[key];
        const ratio = Math.min(xp / MAX_XP_REFERENCE, 1);
        return {
            id: key,
            name: RPG_CLASSES[key].name,
            iconClass: RPG_CLASSES[key].iconClass,
            xp,
            ratio,
            percentage: Math.round(ratio * 100)
        };
    });

    return {
        totals,
        winnerKey,
        winnerClass,
        winnerXp,
        runnerUpKey,
        runnerUpClass,
        runnerUpXp,
        primaryDescription,
        secondaryDescription,
        breakdown
    };
};

/**
 * Cria a store de estado do Quiz.
 */
export const createQuizStore = () => {
    const state = {
        currentStep: 0,
        totalQuestionSteps: QUIZ_QUESTIONS.length,
        contactRecordIndex: null,
        profile: {
            fullName: "",
            nickname: "",
            email: "",
            age: "",
            phone: "",
            gender: "",
            skinTone: ""
        },
        answers: {}
    };

    return {
        getState: () => ({
            ...state,
            profile: { ...state.profile },
            answers: { ...state.answers }
        }),

        updateProfileField(field, value) {
            if (field in state.profile) {
                state.profile[field] = value;
            }
        },

        setQuestionAnswer(questionId, optionId, isMultiple = false, isChecked = true) {
            const currentSelection = state.answers[questionId] ?? [];

            if (!isMultiple) {
                state.answers[questionId] = isChecked ? [optionId] : [];
                return;
            }

            if (isChecked) {
                if (!currentSelection.includes(optionId)) {
                    state.answers[questionId] = [...currentSelection, optionId];
                }
            } else {
                state.answers[questionId] = currentSelection.filter((id) => id !== optionId);
            }
        },

        isStepValid(step = state.currentStep) {
            if (step === 0) {
                return isProfileComplete(state.profile);
            }
            const question = QUIZ_QUESTIONS.find((q) => q.step === step);
            if (!question) return false;
            const selected = state.answers[question.id] ?? [];
            return selected.length > 0;
        },

        setStep(nextStep) {
            state.currentStep = Math.max(0, Math.min(nextStep, state.totalQuestionSteps));
            return state.currentStep;
        },

        setContactRecordIndex(index) {
            state.contactRecordIndex = index;
        },

        resetStore() {
            state.currentStep = 0;
            state.contactRecordIndex = null;
            state.profile = {
                fullName: "",
                nickname: "",
                email: "",
                age: "",
                phone: "",
                gender: "",
                skinTone: ""
            };
            state.answers = {};
        }
    };
};

