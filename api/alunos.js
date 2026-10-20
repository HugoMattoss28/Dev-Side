/**
 * @file api/alunos.js
 * @description Vercel Serverless Function para salvar (POST) e listar (GET)
 *              os alunos da Etec no banco Supabase sem expor chaves no front-end.
 */

export default async function handler(req, res) {
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
        // POST /api/alunos — Insere um novo aluno na tabela alunos_devside
        // =====================================================================
        if (req.method === "POST") {
            const { nome, celular, email, idade, area_vencedora } = req.body || {};

            if (!nome || !celular || !email || idade === undefined || !area_vencedora) {
                return res.status(400).json({
                    error: "Campos obrigatórios ausentes (nome, celular, email, idade, area_vencedora)."
                });
            }

            const payload = {
                nome: String(nome).trim(),
                celular: String(celular).trim(),
                email: String(email).trim().toLowerCase(),
                idade: Number(idade),
                area_vencedora: String(area_vencedora).trim()
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

        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ error: `Método ${req.method} não permitido.` });
    } catch (error) {
        console.error("Erro interno na função /api/alunos:", error);
        return res.status(500).json({ error: "Falha interna ao comunicar com o Supabase." });
    }
}

