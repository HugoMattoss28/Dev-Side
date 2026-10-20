/**
 * @file avatarService.js
 * @description Serviço determinístico de seleção de sprites (mapeado para a estrutura
 *              `avatar/Personagens/{tecnologia|agronegocio|gestao}/{Classe}/{Masculino|Feminino}/{Branca|Morena}/`),
 *              geração de QR Code e composição em <canvas> do Card Colecionável ("Eu fui no Seja Fatec").
 */

import { RPG_CLASSES } from "../config/quizData.js";

const AVATAR_BASE_PATH = "avatar/Personagens/";
const ALLOWED_GENDERS = ["Masculino", "Feminino"];
const ALLOWED_SKINS = ["Branca", "Morena"];

const CLASS_ACCENT_COLORS = Object.freeze({
    // TI
    programacao: { primary: "#38bdf8", secondary: "#0284c7" },
    design: { primary: "#f472b6", secondary: "#db2777" },
    redes: { primary: "#34d399", secondary: "#059669" },
    seguranca: { primary: "#a98cff", secondary: "#7c4dff" },
    // Agronegócio
    agrotech: { primary: "#34d399", secondary: "#059669" },
    agroprod: { primary: "#84cc16", secondary: "#4d7c0f" },
    agroeco: { primary: "#2dd4bf", secondary: "#0d9488" },
    agrolab: { primary: "#38bdf8", secondary: "#0284c7" },
    // Gestão Empresarial
    lideranca: { primary: "#f59e0b", secondary: "#b45309" },
    financas: { primary: "#eab308", secondary: "#a16207" },
    marketing: { primary: "#f472b6", secondary: "#be185d" },
    operacoes: { primary: "#60a5fa", secondary: "#2563eb" }
});

/**
 * Gera uma faixa de nomes de arquivos (`prefix1.png` até `prefixN.png`),
 * pulando eventuais números ausentes na pasta.
 */
const rangeFiles = (prefix, max, skipSet = new Set()) => {
    const list = [];
    for (let i = 1; i <= max; i += 1) {
        if (!skipSet.has(i)) {
            list.push(`${prefix}${i}.png`);
        }
    }
    return list;
};

/**
 * Retorna a lista exata dos arquivos .png existentes em cada pasta da estrutura:
 * `avatar/Personagens/{Area}/{Masculino|Feminino}/{Branca|Morena}/`
 *
 * @param {string} areaKey
 * @param {"Masculino" | "Feminino"} genderFolder
 * @param {"Branca" | "Morena"} skinFolder
 * @returns {string[]}
 */
export const getFolderSpriteFiles = (areaKey, genderFolder, skinFolder) => {
    // 1. Redes possui apenas personagem1..20 (em Feminino/Morena não há o 6)
    if (areaKey === "redes") {
        const skip =
            genderFolder === "Feminino" && skinFolder === "Morena"
                ? new Set([6])
                : new Set();
        return rangeFiles("personagem", 20, skip);
    }

    // 2. Cibersegurança e Programação em Masculino/Branca possuem 48 sprites (12 + 12 + 24)
    if (
        (areaKey === "seguranca" || areaKey === "programacao") &&
        genderFolder === "Masculino" &&
        skinFolder === "Branca"
    ) {
        return [
            ...rangeFiles("cortar1_personagem", 12),
            ...rangeFiles("cortar2_personagem", 12),
            ...rangeFiles("personagem", 24)
        ];
    }

    // 3. Cibersegurança em Masculino/Morena possui 44 sprites (12 + 10 + 22)
    if (areaKey === "seguranca" && genderFolder === "Masculino" && skinFolder === "Morena") {
        return [
            ...rangeFiles("cortar1_personagem", 12),
            ...rangeFiles("cortar2_personagem", 10),
            ...rangeFiles("personagem", 22)
        ];
    }

    // 4. Design em Masculino/Branca possui 39 sprites (não há cortar1_personagem6.png)
    if (areaKey === "design" && genderFolder === "Masculino" && skinFolder === "Branca") {
        return [
            ...rangeFiles("cortar1_personagem", 10, new Set([6])),
            ...rangeFiles("cortar2_personagem", 10),
            ...rangeFiles("personagem", 20)
        ];
    }

    // 5. Padrão das demais pastas: 40 sprites (10 + 10 + 20)
    return [
        ...rangeFiles("cortar1_personagem", 10),
        ...rangeFiles("cortar2_personagem", 10),
        ...rangeFiles("personagem", 20)
    ];
};

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
    if (genderValue === "masculino" || genderValue === "Masculino") return "Masculino";
    if (genderValue === "feminino" || genderValue === "Feminino") return "Feminino";
    if (genderValue === "trans") {
        const cleanEmail = String(email || "padrao").trim().toLowerCase();
        return computeDeterministicIndex(cleanEmail, 2) === 1 ? "Masculino" : "Feminino";
    }
    return null;
};

/**
 * Converte o valor do tom de pele para a nova estrutura de pastas ("Branca" ou "Morena").
 * @param {string} skinTone
 * @returns {"Branca" | "Morena" | null}
 */
export const resolveSkinFolder = (skinTone) => {
    if (skinTone === "clara" || skinTone === "Branca" || skinTone === "skin_1") return "Branca";
    if (skinTone === "escura" || skinTone === "Morena" || skinTone === "skin_2") return "Morena";
    return null;
};

/**
 * Constrói os caminhos de imagem seguros a partir de parâmetros validados.
 * @param {string} areaKey
 * @param {string} genderFolder
 * @param {string} skinInput
 * @param {number} spriteNumber
 * @returns {Object | null}
 */
export const buildAvatarPathsFromParams = (areaKey, genderFolder, skinInput, spriteNumber) => {
    const classConfig = RPG_CLASSES[areaKey];
    if (!classConfig) return null;
    if (!ALLOWED_GENDERS.includes(genderFolder)) return null;

    const skinFolder = resolveSkinFolder(skinInput);
    if (!skinFolder || !ALLOWED_SKINS.includes(skinFolder)) return null;

    const files = getFolderSpriteFiles(areaKey, genderFolder, skinFolder);
    if (!files.length) return null;

    const num = Number(spriteNumber);
    if (!Number.isInteger(num) || num < 1 || num > files.length) return null;

    const fileName = files[num - 1];
    const baseDir = `${AVATAR_BASE_PATH}${classConfig.folderName}/${genderFolder}/${skinFolder}/`;
    const imagePath = `${baseDir}${fileName}`;

    // Caso a pasta de Agro ou Gestão ainda esteja vazia esperando você colocar as fotos,
    // usa automaticamente o fallback da pasta equivalente em `tecnologia/` para nunca quebrar!
    const fallbackFolder = classConfig.fallbackFolderName || "tecnologia/Programacao";
    const fallbackAreaKey =
        classConfig.fallbackAreaKey ||
        (fallbackFolder.endsWith("Redes")
            ? "redes"
            : fallbackFolder.endsWith("Design")
              ? "design"
              : fallbackFolder.endsWith("Cibersegurança")
                ? "seguranca"
                : "programacao");
    const fallbackFiles = getFolderSpriteFiles(fallbackAreaKey, genderFolder, skinFolder);
    const fallbackFile = fallbackFiles[(num - 1) % fallbackFiles.length];
    const fallbackImagePath = `${AVATAR_BASE_PATH}${fallbackFolder}/${genderFolder}/${skinFolder}/${fallbackFile}`;

    return {
        areaKey,
        areaName: classConfig.name,
        iconClass: classConfig.iconClass,
        genderFolder,
        skinFolder,
        spriteNumber: num,
        fileName,
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

    const files = getFolderSpriteFiles(areaKey, genderFolder, skinFolder);
    const cleanEmail = String(email || "aluno_padrao").trim().toLowerCase();

    const seed = `${cleanEmail}${areaKey}${genderFolder}${skinFolder}`;
    const spriteNumber = computeDeterministicIndex(seed, files.length);

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
 * Desenha um retângulo com cantos arredondados no contexto 2D do Canvas.
 */
const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
};

/**
 * Carrega a imagem do sprite no navegador usando encodeURI para suportar caracteres como `ç`.
 * @param {Object} avatar
 * @returns {Promise<HTMLImageElement>}
 */
export const loadAvatarSpriteImage = (avatar) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        let triedFallback = false;

        img.onload = () => resolve(img);
        img.onerror = () => {
            if (!triedFallback && avatar.fallbackImagePath && encodeURI(avatar.fallbackImagePath) !== img.src) {
                triedFallback = true;
                img.src = encodeURI(avatar.fallbackImagePath);
                return;
            }
            reject(new Error(`Falha ao carregar sprite: ${avatar.imagePath}`));
        };

        img.src = encodeURI(avatar.imagePath);
    });

/**
 * Compõe o Card Colecionável Reflective ("Eu fui no Seja Fatec") em um <canvas>
 * de alta resolução unindo o Avatar + Apelido + Classe DevSide na mesma imagem PNG.
 *
 * @param {Object} params
 * @param {Object} params.avatar
 * @param {string} params.nickname
 * @returns {Promise<{ dataUrl: string, blob: Blob | null }>}
 */
export const renderCollectibleAvatarCard = async ({ avatar, nickname }) => {
    const spriteImg = await loadAvatarSpriteImage(avatar);

    if (document.fonts?.ready) {
        try {
            await document.fonts.ready;
        } catch {
            // Prossegue com fonte fallback se necessário
        }
    }

    const canvas = document.createElement("canvas");
    const width = 720;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const accent = CLASS_ACCENT_COLORS[avatar.areaKey] || CLASS_ACCENT_COLORS.programacao;
    const cleanNick = String(nickname || "Aventureiro").trim().slice(0, 24) || "Aventureiro";
    const classUpper = String(avatar.areaName || "DevSide").toUpperCase();

    // 1. Fundo Cósmico Principal do Card com cantos arredondados
    ctx.save();
    drawRoundedRect(ctx, 0, 0, width, height, 36);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, "#0b1022");
    bgGrad.addColorStop(0.5, "#131b36");
    bgGrad.addColorStop(1, "#090c18");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Brilho Radial da Classe atrás do Personagem
    const glowGrad = ctx.createRadialGradient(width / 2, 410, 30, width / 2, 410, 340);
    glowGrad.addColorStop(0, `${accent.primary}44`);
    glowGrad.addColorStop(0.6, `${accent.secondary}18`);
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Feixes Reflexivos Diagonais (Glass / Holographic Sheen no próprio PNG)
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 6);
    const sheenGrad = ctx.createLinearGradient(-width, -height, width, height);
    sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(0.42, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(0.48, "rgba(255, 255, 255, 0.055)");
    sheenGrad.addColorStop(0.5, "rgba(232, 185, 75, 0.09)");
    sheenGrad.addColorStop(0.53, "rgba(255, 255, 255, 0.04)");
    sheenGrad.addColorStop(0.6, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(-width, -height, width * 2, height * 2);
    ctx.restore();

    // 4. Topo do Card: Pill "EU FUI NO SEJA FATEC"
    const topBadgeW = 390;
    const topBadgeH = 44;
    const topBadgeX = (width - topBadgeW) / 2;
    const topBadgeY = 38;

    drawRoundedRect(ctx, topBadgeX, topBadgeY, topBadgeW, topBadgeH, 22);
    ctx.fillStyle = "rgba(232, 185, 75, 0.14)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(232, 185, 75, 0.65)";
    ctx.stroke();

    ctx.font = "700 18px 'Space Grotesk', 'Segoe UI', sans-serif";
    ctx.fillStyle = "#ffd66b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  EU FUI NO SEJA FATEC  ✦", width / 2, topBadgeY + topBadgeH / 2 + 1);

    // 5. Moldura Interna da Arte do Avatar
    const artX = 48;
    const artY = 104;
    const artW = width - 96;
    const artH = 620;

    drawRoundedRect(ctx, artX, artY, artW, artH, 24);
    ctx.fillStyle = "rgba(10, 14, 28, 0.68)";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    // Desenha o Sprite mantendo a proporção exata (contain)
    const padding = 20;
    const maxDrawW = artW - padding * 2;
    const maxDrawH = artH - padding * 2;
    const scale = Math.min(maxDrawW / spriteImg.width, maxDrawH / spriteImg.height);
    const drawW = spriteImg.width * scale;
    const drawH = spriteImg.height * scale;
    const drawX = artX + (artW - drawW) / 2;
    const drawY = artY + (artH - drawH) / 2;

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 12;
    ctx.drawImage(spriteImg, drawX, drawY, drawW, drawH);
    ctx.restore();

    // 6. Painel Inferior de Identificação (Opção B: Moldura de Card Colecionável)
    const footerX = 48;
    const footerY = 748;
    const footerW = width - 96;
    const footerH = 198;

    const panelGrad = ctx.createLinearGradient(footerX, footerY, footerX, footerY + footerH);
    panelGrad.addColorStop(0, "rgba(22, 31, 58, 0.95)");
    panelGrad.addColorStop(1, "rgba(12, 17, 34, 0.98)");

    drawRoundedRect(ctx, footerX, footerY, footerW, footerH, 24);
    ctx.fillStyle = panelGrad;
    ctx.fill();

    const borderGrad = ctx.createLinearGradient(footerX, footerY, footerX + footerW, footerY + footerH);
    borderGrad.addColorStop(0, "#e8b94b");
    borderGrad.addColorStop(0.5, accent.primary);
    borderGrad.addColorStop(1, "#e8b94b");
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // Apelido do Aluno em Destaque
    let nickFontSize = 46;
    if (cleanNick.length > 14) nickFontSize = 36;
    if (cleanNick.length > 20) nickFontSize = 30;

    ctx.font = `700 ${nickFontSize}px 'Space Grotesk', 'Segoe UI', sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(232, 185, 75, 0.35)";
    ctx.shadowBlur = 16;
    ctx.fillText(cleanNick, width / 2, footerY + 62);
    ctx.shadowBlur = 0;

    // Linha divisória dourada sutil dentro do painel
    const lineGrad = ctx.createLinearGradient(footerX + 80, 0, footerX + footerW - 80, 0);
    lineGrad.addColorStop(0, "transparent");
    lineGrad.addColorStop(0.5, "rgba(232, 185, 75, 0.55)");
    lineGrad.addColorStop(1, "transparent");
    ctx.fillStyle = lineGrad;
    ctx.fillRect(footerX + 80, footerY + 104, footerW - 160, 2);

    // Subtítulo da Classe RPG
    ctx.font = "700 22px 'Space Grotesk', 'Segoe UI', sans-serif";
    ctx.fillStyle = accent.primary;
    ctx.fillText(`// CLASSE: ${classUpper}`, width / 2, footerY + 138);

    // Assinatura do Rodapé
    ctx.font = "600 16px 'Space Grotesk', 'Segoe UI', sans-serif";
    ctx.fillStyle = "#9aa3c4";
    ctx.fillText("DEVSIDE  •  DESCUBRA SEU LADO DEV", width / 2, footerY + 172);

    // 7. Moldura Externa Metálica do Card Completo
    drawRoundedRect(ctx, 14, 14, width - 28, height - 28, 28);
    const outerStroke = ctx.createLinearGradient(0, 0, width, height);
    outerStroke.addColorStop(0, "rgba(232, 185, 75, 0.85)");
    outerStroke.addColorStop(0.35, "rgba(255, 255, 255, 0.25)");
    outerStroke.addColorStop(0.7, accent.primary);
    outerStroke.addColorStop(1, "rgba(232, 185, 75, 0.85)");
    ctx.lineWidth = 4;
    ctx.strokeStyle = outerStroke;
    ctx.stroke();

    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

    return { dataUrl, blob };
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

    return `Card-SejaFatec-${safeNickname}-${safeArea}.png`;
};
