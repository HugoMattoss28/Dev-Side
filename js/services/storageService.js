/**
 * @file storageService.js
 * @description Persistência no banco Supabase (via Vercel Serverless Function `/api/alunos`)
 *              e backup local seguro via localStorage.
 */

const LOCAL_STORAGE_KEY = "contatosDevside";
const SUPABASE_API_ENDPOINT = "/api/alunos";

/**
 * Lê a lista de contatos armazenada localmente no navegador (backup/offline).
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
 * Salva ou atualiza o registro de contato do jogador no localStorage com as colunas enxutas.
 * @param {Object} params
 * @param {Object} params.profile
 * @param {string} [params.winnerKey=""]
 * @param {number|null} [params.existingIndex=null]
 * @returns {number|null} Índice do contato salvo
 */
export const saveContactLocally = ({ profile, winnerKey = "", existingIndex = null }) => {
    try {
        const contacts = getSavedContacts();
        const contactEntry = {
            nome: String(profile.fullName ?? "").trim(),
            celular: String(profile.phone ?? "").trim(),
            email: String(profile.email ?? "").trim().toLowerCase(),
            idade: Number(profile.age ?? 0),
            area_vencedora: winnerKey
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
 * Verifica antes de iniciar o quiz (e antes de salvar) se o e-mail ou celular
 * já participou do quiz (checando tanto o Supabase quanto o localStorage).
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.phone
 * @param {number|null} [params.ignoreLocalIndex=null]
 * @returns {Promise<{ emailExists: boolean, phoneExists: boolean }>}
 */
export const checkStudentAlreadyExists = async ({ email, phone, ignoreLocalIndex = null }) => {
    const cleanEmail = String(email ?? "").trim().toLowerCase();
    const cleanPhoneDigits = String(phone ?? "").replace(/\D/g, "");

    // 1. Checagem rápida no localStorage deste navegador
    const localContacts = getSavedContacts();
    let localEmailExists = false;
    let localPhoneExists = false;

    localContacts.forEach((entry, index) => {
        if (ignoreLocalIndex !== null && index === ignoreLocalIndex) return;
        if (cleanEmail && String(entry.email ?? "").trim().toLowerCase() === cleanEmail) {
            localEmailExists = true;
        }
        if (cleanPhoneDigits && String(entry.celular ?? "").replace(/\D/g, "") === cleanPhoneDigits) {
            localPhoneExists = true;
        }
    });

    // 2. Checagem no banco Supabase via /api/alunos?action=check
    try {
        const url = new URL(SUPABASE_API_ENDPOINT, window.location.origin);
        url.searchParams.set("action", "check");
        url.searchParams.set("email", cleanEmail);
        url.searchParams.set("celular", String(phone ?? "").trim());

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            const remote = await response.json();
            return {
                emailExists: Boolean(remote.emailExists) || localEmailExists,
                phoneExists: Boolean(remote.phoneExists) || localPhoneExists
            };
        }
    } catch (error) {
        console.warn("Verificação remota indisponível, aplicando validação local:", error);
    }

    return {
        emailExists: localEmailExists,
        phoneExists: localPhoneExists
    };
};

/**
 * Envia os dados do aluno (`nome`, `celular`, `email`, `idade`, `area_vencedora`)
 * para o banco de dados Supabase através da rota `/api/alunos` da Vercel.
 * @param {Object} params
 * @param {Object} params.profile
 * @param {string} params.winnerKey
 * @returns {Promise<{ ok: boolean, status?: number, error?: string, field?: string }>}
 */
export const submitQuizTelemetry = async ({ profile, winnerKey }) => {
    const payload = {
        nome: String(profile.fullName ?? "").trim(),
        celular: String(profile.phone ?? "").trim(),
        email: String(profile.email ?? "").trim().toLowerCase(),
        idade: Number(profile.age ?? 0),
        area_vencedora: String(winnerKey ?? "").trim()
    };

    try {
        const response = await fetch(SUPABASE_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            console.warn("Aviso ao salvar no Supabase:", errorBody.error || response.status);
            return {
                ok: false,
                status: response.status,
                error: errorBody.error || "Não foi possível salvar os dados.",
                field: errorBody.field
            };
        }

        return { ok: true };
    } catch (error) {
        console.error("Falha de rede ao enviar dados para /api/alunos:", error);
        return { ok: false, error: "Erro de conexão com o servidor." };
    }
};

/**
 * Busca todos os alunos salvos no Supabase (ou retorna o backup local caso esteja rodando offline).
 * @returns {Promise<{ source: "supabase" | "local", data: Array<Object> }>}
 */
export const fetchAllStudents = async () => {
    try {
        const response = await fetch(SUPABASE_API_ENDPOINT, {
            method: "GET",
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                return { source: "supabase", data };
            }
        }
    } catch (error) {
        console.warn("Banco remoto indisponível, utilizando backup local:", error);
    }

    return {
        source: "local",
        data: getSavedContacts()
    };
};
