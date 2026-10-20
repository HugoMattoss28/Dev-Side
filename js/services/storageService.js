/**
 * @file storageService.js
 * @description Persistência local segura (localStorage) e integração assíncrona
 *              com a planilha da coordenação (SheetMonkey API).
 */

const LOCAL_STORAGE_KEY = "contatosDevside";
const SHEETMONKEY_ENDPOINT = "https://api.sheetmonkey.io/form/8cBBsYzaLpR54UuK9HKCRL";

/**
 * Lê a lista de contatos armazenada no navegador com tratamento de erro.
 * @returns {Array<Object>}
 */
export const getSavedContacts = () => {
    try {
        const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!rawData) return [];
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Erro ao ler contatos do localStorage:", error);
        return [];
    }
};

/**
 * Salva ou atualiza o registro de contato do jogador no localStorage.
 * @param {Object} params
 * @param {Object} params.profile
 * @param {string} [params.avatarPath=""]
 * @param {number|null} [params.existingIndex=null]
 * @returns {number|null} Índice do contato salvo
 */
export const saveContactLocally = ({ profile, avatarPath = "", existingIndex = null }) => {
    try {
        const contacts = getSavedContacts();
        const contactEntry = {
            nome: String(profile.fullName ?? "").trim(),
            celular: String(profile.phone ?? "").trim(),
            avatar: avatarPath,
            data: new Date().toLocaleString("pt-BR")
        };

        let targetIndex = existingIndex;

        if (targetIndex === null || targetIndex < 0 || targetIndex >= contacts.length) {
            contacts.push(contactEntry);
            targetIndex = contacts.length - 1;
        } else {
            contacts[targetIndex] = contactEntry;
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
        return targetIndex;
    } catch (error) {
        console.error("Não foi possível salvar o contato localmente:", error);
        return existingIndex;
    }
};

/**
 * Envia os dados consolidados do jogador e o resultado do quiz para o SheetMonkey.
 * @param {Object} params
 * @param {Object} params.profile
 * @param {string} params.winnerKey
 * @param {Object|null} params.avatar
 * @returns {Promise<boolean>}
 */
export const submitQuizTelemetry = async ({ profile, winnerKey, avatar }) => {
    const payload = {
        Nome: String(profile.fullName ?? "").trim(),
        Apelido: String(profile.nickname ?? "").trim(),
        Celular: String(profile.phone ?? "").trim(),
        Email: String(profile.email ?? "").trim(),
        Idade: String(profile.age ?? "").trim(),
        Genero: String(profile.gender ?? "").trim(),
        TomPele: String(profile.skinTone ?? "").trim(),
        Area: winnerKey,
        LinkAvatar: avatar?.imagePath ? `${window.location.origin}/${avatar.imagePath}` : "",
        Data: new Date().toLocaleString("pt-BR")
    };

    try {
        const response = await fetch(SHEETMONKEY_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.warn("A planilha retornou um status inesperado:", response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Falha de rede ao enviar dados para o SheetMonkey:", error);
        return false;
    }
};

