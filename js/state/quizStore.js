/**
 * @file quizStore.js
 * @description Gerenciamento de estado centralizado e funções puras para validação
 *              e cálculo de pontuação (XP) multi-trilha (TI, Agronegócio e Gestão).
 */

import { QUIZ_QUESTIONS_BY_TRACK, RPG_CLASSES } from "../config/quizData.js";

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
        case "track":
            return ["ti", "agro", "gestao"].includes(value);
        case "fullName": {
            const normalized = value.replace(/\s+/g, " ");
            if (normalized.length <= 8 || !FULL_NAME_REGEX.test(normalized)) return false;
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
 * Verifica se todos os dados obrigatórios da Etapa 0 estão válidos (incluindo a Trilha).
 * @param {Object} profile
 * @returns {boolean}
 */
export const isProfileComplete = (profile) =>
    validateProfileField("track", profile.track) &&
    validateProfileField("fullName", profile.fullName) &&
    validateProfileField("nickname", profile.nickname) &&
    validateProfileField("email", profile.email) &&
    validateProfileField("age", profile.age) &&
    validateProfileField("phone", profile.phone) &&
    validateProfileField("gender", profile.gender) &&
    validateProfileField("skinTone", profile.skinTone);

/**
 * Calcula a pontuação completa (XP) e determina a classe principal e secundária
 * dentro da trilha selecionada (`ti`, `agro` ou `gestao`).
 * @param {Record<string, string[]>} answersMap
 * @param {"ti" | "agro" | "gestao"} [track="ti"]
 * @returns {Object}
 */
export const calculateQuizResult = (answersMap, track = "ti") => {
    const activeTrack = ["ti", "agro", "gestao"].includes(track) ? track : "ti";
    const questions = QUIZ_QUESTIONS_BY_TRACK[activeTrack] || QUIZ_QUESTIONS_BY_TRACK.ti;

    const classKeys = Object.keys(RPG_CLASSES).filter(
        (key) => RPG_CLASSES[key].track === activeTrack
    );

    const totals = {};
    for (const key of classKeys) {
        totals[key] = 0;
    }

    for (const question of questions) {
        const selectedOptionIds = answersMap[question.id] ?? [];

        for (const optionId of selectedOptionIds) {
            const matchedOption = question.options.find((opt) => opt.id === optionId);
            if (!matchedOption) continue;

            for (const [classKey, points] of Object.entries(matchedOption.scores)) {
                if (classKey in totals) {
                    totals[classKey] += points;
                }
            }
        }
    }

    // Descobre a classe vencedora na trilha ativa
    let winnerKey = classKeys[0];
    for (const key of classKeys) {
        if (totals[key] > totals[winnerKey]) {
            winnerKey = key;
        }
    }

    // Descobre a segunda classe com maior XP na trilha ativa
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

    // Calcula dinamicamente o XP máximo de referência da trilha (ex: 8 no Agro, 50 em TI/Gestão)
    let maxTrackXp = 0;
    for (const question of questions) {
        let maxQuestionPoints = 0;
        for (const opt of question.options) {
            for (const pts of Object.values(opt.scores)) {
                if (pts > maxQuestionPoints) maxQuestionPoints = pts;
            }
        }
        maxTrackXp += maxQuestionPoints;
    }
    if (maxTrackXp <= 0) maxTrackXp = MAX_XP_REFERENCE;

    const highXpThreshold = Math.ceil(maxTrackXp * 0.6);

    const primaryDescription =
        winnerXp >= highXpThreshold
            ? winnerClass.descriptions.primaryHigh
            : winnerClass.descriptions.primaryNormal;

    const secondaryDescription =
        runnerUpXp >= highXpThreshold
            ? runnerUpClass.descriptions.secondaryHigh
            : runnerUpClass.descriptions.secondaryNormal;

    const breakdown = classKeys.map((key) => {
        const xp = totals[key];
        const ratio = Math.min(xp / maxTrackXp, 1);
        return {
            id: key,
            name: RPG_CLASSES[key].name,
            iconClass: RPG_CLASSES[key].iconClass,
            xp,
            maxXp: maxTrackXp,
            ratio,
            percentage: Math.round(ratio * 100)
        };
    });

    return {
        track: activeTrack,
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
        totalQuestionSteps: 10,
        contactRecordIndex: null,
        profile: {
            track: "",
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
                // Se o aluno trocar de área de interesse (TI / Agro / Gestão), limpa respostas e atualiza total de etapas
                if (field === "track" && state.profile.track !== value) {
                    state.answers = {};
                    const trackQuestions = QUIZ_QUESTIONS_BY_TRACK[value] || QUIZ_QUESTIONS_BY_TRACK.ti;
                    state.totalQuestionSteps = trackQuestions.length;
                }
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
            const activeTrack = state.profile.track || "ti";
            const questions = QUIZ_QUESTIONS_BY_TRACK[activeTrack] || QUIZ_QUESTIONS_BY_TRACK.ti;
            const question = questions.find((q) => q.step === step);
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
            state.totalQuestionSteps = QUIZ_QUESTIONS_BY_TRACK.ti.length;
            state.contactRecordIndex = null;
            state.profile = {
                track: "",
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
