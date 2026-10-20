/**
 * @file avatarService.js
 * @description Serviço determinístico de seleção, resolução de sprites e geração/validação
 *              segura de links para resgate via QR Code no celular.
 */

import { RPG_CLASSES } from "../config/quizData.js";

const AVATAR_BASE_PATH = "avatar/Personagens/";
const ALLOWED_GENDERS = ["Masculino", "Feminino"];
const ALLOWED_SKINS = ["skin_1", "skin_2"];

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
 * Constrói os caminhos de imagem seguros a partir de parâmetros validados.
 * @param {string} areaKey
 * @param {string} genderFolder
 * @param {string} skinFolder
 * @param {number} spriteNumber
 * @returns {Object | null}
 */
export const buildAvatarPathsFromParams = (areaKey, genderFolder, skinFolder, spriteNumber) => {
    const classConfig = RPG_CLASSES[areaKey];
    if (!classConfig) return null;
    if (!ALLOWED_GENDERS.includes(genderFolder)) return null;
    if (!ALLOWED_SKINS.includes(skinFolder)) return null;

    const num = Number(spriteNumber);
    if (!Number.isInteger(num) || num < 1 || num > 40) return null;

    const primaryPrefix = areaKey === "seguranca" ? "seguranca" : classConfig.folderName;
    const alternatePrefix =
        primaryPrefix.charAt(0) === primaryPrefix.charAt(0).toLowerCase()
            ? primaryPrefix.charAt(0).toUpperCase() + primaryPrefix.slice(1)
            : primaryPrefix.toLowerCase();

    const baseDir = `${AVATAR_BASE_PATH}${classConfig.folderName}/${genderFolder}/sprites/${skinFolder}/`;
    const imagePath = `${baseDir}${primaryPrefix} (${num}).png`;
    const fallbackImagePath = `${baseDir}${alternatePrefix} (${num}).png`;

    return {
        areaKey,
        areaName: classConfig.name,
        iconClass: classConfig.iconClass,
        genderFolder,
        skinFolder,
        spriteNumber: num,
        imagePath,
        fallbackImagePath
    };
};

/**
 * Gera os metadados completos do avatar com base nas escolhas do jogador.
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

    return buildAvatarPathsFromParams(areaKey, genderFolder, skinFolder, spriteNumber);
};

/**
 * Gera a URL completa da página mobile `resgatar.html` e a URL da imagem do QR Code.
 * @param {Object} avatar
 * @param {string} nickname
 * @returns {{ rescueUrl: string, qrCodeImageUrl: string }}
 */
export const buildAvatarRescueQrData = (avatar, nickname) => {
    const cleanNick = String(nickname || "Aventureiro")
        .trim()
        .replace(/[<>"]/g, "")
        .slice(0, 32);

    const url = new URL("resgatar.html", window.location.href);
    url.searchParams.set("a", avatar.areaKey);
    url.searchParams.set("g", avatar.genderFolder);
    url.searchParams.set("s", avatar.skinFolder);
    url.searchParams.set("n", String(avatar.spriteNumber));
    url.searchParams.set("nick", cleanNick);

    const rescueUrl = url.toString();
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&ecc=M&data=${encodeURIComponent(rescueUrl)}`;

    return {
        rescueUrl,
        qrCodeImageUrl
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
