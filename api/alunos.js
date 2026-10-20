/**
 * @file api/alunos.js
 * @description Vercel Serverless Function blindada (CORS estrito, Rate Limit por IP,
 *              Sanitização contra XSS e Validação de Payload) para salvar (POST)
 *              e listar (GET) os alunos da Etec no Supabase.
 */

const ALLOWED_ORIGINS = new Set([
    "https://devside-psi.vercel.app",
    "http://localhost:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:3000"
]);

const VALID_AREAS = new Set(["programacao", "design", "redes", "seguranca"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate Limiting em memória por IP (máx 6 envios por minuto por IP)
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

    // 2. Leitura Segura das Chaves no Servidor (Diretriz 1 do seguranca.md)
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
        // POST /api/alunos — Valida, sanitiza e insere um novo aluno
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

            const cleanNome = sanitizeText(nome, 120);
            const cleanCelular = sanitizeText(celular, 20);
            const digitsPhone = cleanCelular.replace(/\D/g, "");
            const cleanEmail = sanitizeText(email, 160).toLowerCase();
            const parsedAge = Number(idade);
            const cleanArea = sanitizeText(area_vencedora, 30).toLowerCase();

            // Validação rigorosa de Payload no Backend (Diretriz 4 do seguranca.md)
            if (cleanNome.length <= 8) {
                return res.status(400).json({ error: "Nome inválido (mínimo 9 caracteres)." });
            }
            if (digitsPhone.length < 10 || digitsPhone.length > 11) {
                return res.status(400).json({ error: "Celular inválido (deve conter DDD + número)." });
            }
            if (!EMAIL_REGEX.test(cleanEmail)) {
                return res.status(400).json({ error: "E-mail em formato inválido." });
            }
            if (!Number.isInteger(parsedAge) || parsedAge < 10 || parsedAge > 99) {
                return res.status(400).json({ error: "Idade fora do intervalo permitido (10 a 99)." });
            }
            if (!VALID_AREAS.has(cleanArea)) {
                return res.status(400).json({ error: "Área vencedora inválida." });
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
