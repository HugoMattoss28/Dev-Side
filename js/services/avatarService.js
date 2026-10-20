/**
 * @file avatarService.js
 * @description Serviço determinístico de seleção e resolução de sprites de avatar
 *              baseado no hash do e-mail do jogador, com fallback para case-sensitivity.
 */

import { RPG_CLASSES } from "../config/quizData.js";

const AVATAR_BASE_PATH = "avatar/Personagens/";

/**
 * Gera um número determinístico entre 1 e `limit` a partir de uma string semente.
 * @param {string} seedText
 * @param {number} limit
 * @returns {number}
 */
export const computeDeterministicIndex = (seedText, limit) => {
    let hash = 0;
    const normalized = String(seedText || "padrao");

    for (let i = 0; i < normalized.length; i += 1) {
        hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
    }

    return (Math.abs(hash) % limit) + 1;
};

/**
 * Resolve a pasta de gênero ("Masculino" ou "Feminino") de forma determinística.
 * @param {string} genderValue
 * @param {string} email
 * @returns {"Masculino" | "Feminino" | null}
 */
export const resolveAvatarGenderFolder = (genderValue, email) => {
    if (genderValue === "masculino") return "Masculino";
    if (genderValue === "feminino") return "Feminino";
    if (genderValue === "trans") {
        const cleanEmail = String(email || "padrao").trim().toLowerCase();
        return computeDeterministicIndex(cleanEmail, 2) === 1 ? "Masculino" : "Feminino";
    }
    return null;
};

/**
 * Converte o valor do tom de pele na pasta correspondente de sprites.
 * @param {string} skinTone
 * @returns {"skin_1" | "skin_2" | null}
 */
export const resolveSkinFolder = (skinTone) => {
    if (skinTone === "clara") return "skin_1";
    if (skinTone === "escura") return "skin_2";
    return null;
};

/**
 * Gera os metadados completos do avatar (incluindo caminho alternativo caso o servidor
 * diferencie maiúsculas/minúsculas como `Seguranca (1).png` vs `seguranca (10).png`).
 * @param {Object} params
 * @param {string} params.areaKey
 * @param {string} params.gender
 * @param {string} params.skinTone
 * @param {string} params.email
 * @returns {Object | null}
 */
export const resolveAvatarAsset = ({ areaKey, gender, skinTone, email }) => {
    const classConfig = RPG_CLASSES[areaKey];
    if (!classConfig) return null;

    const genderFolder = resolveAvatarGenderFolder(gender, email);
    const skinFolder = resolveSkinFolder(skinTone);

    if (!genderFolder || !skinFolder) return null;

    const genderKey = genderFolder.toLowerCase();
    const maxSprites = classConfig.spriteCount[genderKey] || 40;
    const cleanEmail = String(email || "aluno_padrao").trim().toLowerCase();

    const seed = `${cleanEmail}${areaKey}${genderFolder}${skinTone}`;
    const spriteNumber = computeDeterministicIndex(seed, maxSprites);

    const primaryPrefix = areaKey === "seguranca" ? "seguranca" : classConfig.folderName;
    const alternatePrefix =
        primaryPrefix.charAt(0) === primaryPrefix.charAt(0).toLowerCase()
            ? primaryPrefix.charAt(0).toUpperCase() + primaryPrefix.slice(1)
            : primaryPrefix.toLowerCase();

    const baseDir = `${AVATAR_BASE_PATH}${classConfig.folderName}/${genderFolder}/sprites/${skinFolder}/`;
    const imagePath = `${baseDir}${primaryPrefix} (${spriteNumber}).png`;
    const fallbackImagePath = `${baseDir}${alternatePrefix} (${spriteNumber}).png`;

    return {
        areaKey,
        areaName: classConfig.name,
        genderFolder,
        skinTone,
        skinFolder,
        spriteNumber,
        imagePath,
        fallbackImagePath
    };
};

/**
 * Formata um nome de arquivo seguro para download do avatar.
 * @param {string} nickname
 * @param {string} areaName
 * @returns {string}
 */
export const formatAvatarDownloadFilename = (nickname, areaName) => {
    const sanitize = (text, fallback) =>
        String(text || fallback)
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || fallback;

    const safeNickname = sanitize(nickname, "Aventureiro");
    const safeArea = sanitize(areaName, "DevSide");

    return `${safeNickname}-${safeArea}.png`;
};

