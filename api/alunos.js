/**
 * @file api/alunos.js
 * @description Vercel Serverless Function blindada (CORS estrito, Rate Limit por IP,
 *              Sanitização contra XSS, Validação de Dados Reais e Bloqueio de Duplicidade
 *              de E-mail/Celular) para o banco Supabase.
 */

const ALLOWED_ORIGINS = new Set([
    "https://devside-psi.vercel.app",
    "http://localhost:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:3000"
]);

const VALID_AREAS = new Set([
    // TI
    "programacao",
    "design",
    "redes",
    "seguranca",
    // Agronegócio
    "agrotech",
    "agroprod",
    "agroeco",
    "agrolab",
    // Gestão Empresarial
    "lideranca",
    "financas",
    "marketing",
    "operacoes"
]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FULL_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

// Rate Limiting em memória por IP
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_POSTS = 6;

const isRateLimited = (ip) => {
    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    record.count += 1;
    rateLimitMap.set(ip, record);
    return record.count > RATE_LIMIT_MAX_POSTS;
};

const sanitizeText = (value, maxLength = 120) =>
    String(value ?? "")
        .trim()
        .replace(/[<>]/g, "")
        .slice(0, maxLength);

const isValidBrazilianPhone = (digits) => {
    if (digits.length < 10 || digits.length > 11) return false;
    const ddd = Number(digits.slice(0, 2));
    if (ddd < 11 || ddd > 99) return false;
    const localNumber = digits.slice(2);
    // Bloqueia sequências repetidas falsas como 999999999 ou 000000000
    if (/^(\d)\1+$/.test(localNumber)) return false;
    return true;
};

/**
 * Consulta no Supabase se já existe um aluno com o mesmo e-mail ou celular.
 */
async function checkExistingStudent(endpoint, headers, email, celular) {
    const queryUrl = new URL(endpoint);
    queryUrl.searchParams.set("select", "id,email,celular");
    queryUrl.searchParams.set(
        "or",
        `(email.eq.${email},celular.eq.${celular})`
    );
    queryUrl.searchParams.set("limit", "5");

    const response = await fetch(queryUrl.toString(), {
        method: "GET",
        headers
    });

    if (!response.ok) {
        return { emailExists: false, phoneExists: false };
    }

    const rows = await response.json();
    if (!Array.isArray(rows)) {
        return { emailExists: false, phoneExists: false };
    }

    const emailExists = rows.some(
        (r) => String(r.email || "").toLowerCase() === email.toLowerCase()
    );
    const phoneExists = rows.some(
        (r) => String(r.celular || "").replace(/\D/g, "") === celular.replace(/\D/g, "")
    );

    return { emailExists, phoneExists };
}

export default async function handler(req, res) {
    // 1. Verificação e Configuração de CORS (Diretriz 3 do seguranca.md)
    const origin = req.headers.origin || "";
    const host = req.headers.host || "";
    const isSameHost = origin && origin.includes(host);

    if (origin && !ALLOWED_ORIGINS.has(origin) && !isSameHost) {
        return res.status(403).json({ error: "Origem não autorizada pelo CORS." });
    }

    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // 2. Leitura Segura das Chaves no Servidor
    const supabaseUrl =
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({
            error: "Variáveis de ambiente do Supabase não encontradas na Vercel. Verifique se o banco devside-db está conectado ao projeto."
        });
    }

    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/alunos_devside`;

    const defaultHeaders = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
    };

    try {
        // =====================================================================
        // GET /api/alunos?action=check — Verifica duplicidade na Etapa 0
        // =====================================================================
        if (req.method === "GET" && req.query?.action === "check") {
            const checkEmail = sanitizeText(req.query.email || "", 160).toLowerCase();
            const checkCelular = sanitizeText(req.query.celular || "", 20);

            if (!checkEmail && !checkCelular) {
                return res.status(400).json({ error: "Informe email ou celular para verificação." });
            }

            const result = await checkExistingStudent(
                endpoint,
                defaultHeaders,
                checkEmail,
                checkCelular
            );

            return res.status(200).json(result);
        }

        // =====================================================================
        // POST /api/alunos — Valida, checa duplicidade e insere novo aluno
        // =====================================================================
        if (req.method === "POST") {
            const clientIp =
                (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
                req.socket?.remoteAddress ||
                "unknown";

            if (isRateLimited(clientIp)) {
                return res.status(429).json({
                    error: "Muitas tentativas em sequência. Aguarde um minuto antes de enviar novamente."
                });
            }

            const { nome, celular, email, idade, area_vencedora } = req.body || {};

            const cleanNome = sanitizeText(nome, 120).replace(/\s+/g, " ");
            const cleanCelular = sanitizeText(celular, 20);
            const digitsPhone = cleanCelular.replace(/\D/g, "");
            const cleanEmail = sanitizeText(email, 160).toLowerCase();
            const parsedAge = Number(idade);
            const cleanArea = sanitizeText(area_vencedora, 30).toLowerCase();

            // 1. Validação estrita de formato e integridade dos dados
            if (cleanNome.length <= 8 || !FULL_NAME_REGEX.test(cleanNome)) {
                return res.status(400).json({
                    field: "fullName",
                    error: "Informe seu nome e sobrenome completos (apenas letras)."
                });
            }
            if (!isValidBrazilianPhone(digitsPhone)) {
                return res.status(400).json({
                    field: "phone",
                    error: "Informe um celular válido com DDD (ex: (17) 99123-4567)."
                });
            }
            if (!EMAIL_REGEX.test(cleanEmail)) {
                return res.status(400).json({
                    field: "email",
                    error: "Informe um endereço de e-mail válido."
                });
            }
            if (!Number.isInteger(parsedAge) || parsedAge < 10 || parsedAge > 99) {
                return res.status(400).json({
                    field: "age",
                    error: "Idade fora do intervalo permitido (10 a 99 anos)."
                });
            }
            if (!VALID_AREAS.has(cleanArea)) {
                return res.status(400).json({
                    error: "Área vencedora inválida."
                });
            }

            // 2. Verificação de Duplicidade no Banco antes de inserir
            const { emailExists, phoneExists } = await checkExistingStudent(
                endpoint,
                defaultHeaders,
                cleanEmail,
                cleanCelular
            );

            if (emailExists) {
                return res.status(409).json({
                    field: "email",
                    error: "Este e-mail já realizou o quiz DevSide!"
                });
            }

            if (phoneExists) {
                return res.status(409).json({
                    field: "phone",
                    error: "Este número de celular já realizou o quiz DevSide!"
                });
            }

            const payload = {
                nome: cleanNome,
                celular: cleanCelular,
                email: cleanEmail,
                idade: parsedAge,
                area_vencedora: cleanArea
            };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    ...defaultHeaders,
                    Prefer: "return=representation"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                // Trata erro de constraint UNIQUE do Postgres (código 23505)
                if (errorDetail.includes("23505") || errorDetail.includes("duplicate key")) {
                    return res.status(409).json({
                        field: "email",
                        error: "Este e-mail ou celular já está cadastrado no banco!"
                    });
                }
                return res.status(response.status).json({
                    error: "Erro ao salvar aluno no Supabase.",
                    details: errorDetail
                });
            }

            const inserted = await response.json();
            return res.status(201).json({ ok: true, data: inserted });
        }

        // =====================================================================
        // GET /api/alunos — Lista todos os alunos cadastrados para exportação
        // =====================================================================
        if (req.method === "GET") {
            const response = await fetch(
                `${endpoint}?select=id,nome,celular,email,idade,area_vencedora&order=id.desc`,
                {
                    method: "GET",
                    headers: defaultHeaders
                }
            );

            if (!response.ok) {
                const errorDetail = await response.text();
                return res.status(response.status).json({
                    error: "Erro ao buscar alunos no Supabase.",
                    details: errorDetail
                });
            }

            const students = await response.json();
            return res.status(200).json(students);
        }

        res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
        return res.status(405).json({ error: `Método ${req.method} não permitido.` });
    } catch (error) {
        console.error("Erro interno na função /api/alunos:", error);
        return res.status(500).json({ error: "Falha interna ao comunicar com o Supabase." });
    }
}
