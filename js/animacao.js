/* =========================================================
   PIXELU — CONTROLE DO QUIZ
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const totalPerguntas = 10;

    let etapaAtual = 0;


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const dadosPessoais =
        document.getElementById("perguntaDados");


    /* =====================================================
       MOSTRAR ETAPA
       ===================================================== */

    function mostrarEtapa(etapa) {

        /* Esconde ou mostra os dados pessoais */
        if (dadosPessoais) {
            dadosPessoais.style.display =
                (etapa === 0) ? "block" : "none";
        }

        /* Esconde ou mostra as perguntas de 1 a 10 */
        for (let i = 1; i <= totalPerguntas; i++) {

            const pergunta =
                document.getElementById(`pergunta${i}`);

            if (pergunta) {
                pergunta.style.display =
                    (etapa === i) ? "block" : "none";
            }
        }

        etapaAtual = etapa;

        atualizarBotoes();

        /* Rola a página suavemente para o topo */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       BORDA DE CAMPO INVÁLIDO
       ===================================================== */

    function marcarCampo(campo, valido) {

        if (!campo) {
            return;
        }

        if (valido) {

            campo.style.removeProperty("border");
            campo.style.removeProperty("box-shadow");

        } else {

            campo.style.setProperty(
                "border",
                "3px solid #ff0000",
                "important"
            );

            campo.style.setProperty(
                "box-shadow",
                "0 0 8px rgba(129, 3, 3, 0.45)",
                "important"
            );
        }
    }


    /* =====================================================
       VERIFICAR DADOS PESSOAIS
       ===================================================== */

    function dadosPreenchidos() {

        const nome =
            document.getElementById("nome");

        const nickname =
            document.getElementById("nickname");

        const celular =
            document.getElementById("celular");

        const email =
            document.getElementById("email");

        const idade =
            document.getElementById("idade");


        const genero =
            document.querySelector(
                'input[name="genero"]:checked'
            );


        const tomPele =
            document.querySelector(
                'input[name="tomPele"]:checked'
            );


        /* =================================================
           VERIFICA NOME
           ================================================= */

        const nomeValido =
            nome &&
            nome.value.trim().length > 8;


        /* =================================================
           VERIFICA NICKNAME
           ================================================= */

        const nicknameValido =
            !nickname ||
            nickname.value.trim().length > 0;


        /* =================================================
           VERIFICA CELULAR
           ================================================= */

        const celularNumeros =
            celular
                ? celular.value.replace(/\D/g, "")
                : "";

        const celularValido =
            celular &&
            celularNumeros.length >= 10;


        /* =================================================
           VERIFICA E-MAIL
           ================================================= */

        const emailValido =
            email &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.value.trim()
            );


        /* =================================================
           VERIFICA IDADE
           ================================================= */

        const idadeValida =
            idade &&
            idade.value.trim() !== "";


        /* =================================================
           VERIFICA GÊNERO
           ================================================= */

        const generoValido =
            !!genero;


        /* =================================================
           VERIFICA TOM DE PELE
           ================================================= */

        const tomPeleValido =
            !!tomPele;


        /* =================================================
           RETORNA SE TUDO ESTÁ CORRETO
           ================================================= */

        return (
            nomeValido &&
            nicknameValido &&
            celularValido &&
            emailValido &&
            idadeValida &&
            generoValido &&
            tomPeleValido
        );
    }


    /* =====================================================
       VERIFICAR PERGUNTA RESPONDIDA
       ===================================================== */

    function perguntaRespondida(numero) {

        const pergunta =
            document.getElementById(`pergunta${numero}`);


        if (!pergunta) {
            return false;
        }


        const respostas =
            pergunta.querySelectorAll(
                'input[type="radio"], input[type="checkbox"]'
            );


        return Array.from(respostas).some(
            resposta => resposta.checked
        );
    }


    /* =====================================================
       VERIFICAR ETAPA ATUAL
       ===================================================== */

    function etapaRespondida() {

        if (etapaAtual === 0) {
            return dadosPreenchidos();
        }

        return perguntaRespondida(etapaAtual);
    }


    /* =====================================================
       ATUALIZAR BOTÕES
       ===================================================== */

    function atualizarBotoes() {

        /* Dados pessoais (Etapa 0) */
        if (etapaAtual === 0) {

            const proxima =
                document.getElementById(
                    "btnProximaDados"
                );


            if (proxima) {

                proxima.disabled =
                    !dadosPreenchidos();
            }


            return;
        }


        /* Perguntas 1 a 9 */
        if (etapaAtual < totalPerguntas) {

            const proxima =
                document.getElementById(
                    `btnProxima${etapaAtual}`
                );


            if (proxima) {

                proxima.disabled =
                    !perguntaRespondida(etapaAtual);
            }
        }


        /* Pergunta 10 */
        else if (etapaAtual === totalPerguntas) {

            const btnVerPontuacao =
                document.getElementById(
                    "btnVerPontuacao"
                );


            if (btnVerPontuacao) {

                btnVerPontuacao.disabled =
                    !perguntaRespondida(totalPerguntas);


                btnVerPontuacao.style.opacity =
                    perguntaRespondida(totalPerguntas)
                        ? "1"
                        : "0.5";
            }
        }
    }


    /* =====================================================
       IR PARA PRÓXIMA ETAPA
       ===================================================== */

    function proximaEtapa() {

        if (!etapaRespondida()) {
            return;
        }


        if (etapaAtual === totalPerguntas) {

            finalizarQuiz();

            return;
        }


        mostrarEtapa(etapaAtual + 1);
    }


    /* =====================================================
       VOLTAR ETAPA
       ===================================================== */

    function voltarEtapa() {

        if (etapaAtual === 0) {
            return;
        }


        mostrarEtapa(etapaAtual - 1);
    }


    /* =====================================================
       FINALIZAR QUIZ
       ===================================================== */

    /* =====================================================
   FINALIZAR QUIZ E ENVIAR DADOS
   ===================================================== */

const ENDPOINT_PLANILHA = "https://api.sheetmonkey.io/form/8cBBsYzaLpR54UuK9HKCRL";

function enviarParaPlanilha(dados) {
    fetch(ENDPOINT_PLANILHA, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(resposta => {
        if (resposta.ok) {
            console.log("✅ Dados enviados para o Google Sheets com sucesso!");
        } else {
            console.warn("⚠️ Ocorreu um problema ao enviar para a planilha.");
        }
    })
    .catch(erro => {
        console.error("❌ Erro de comunicação com o SheetMonkey:", erro);
    });
}

function finalizarQuiz() {
    // 1. Descobre a área vencedora (calculada no script.js)
    const vencedor = (typeof descobrirVencedor === "function") 
        ? descobrirVencedor() 
        : "programacao";

    // 2. Cria e exibe o avatar (função do avatar.js)
    let avatar = null;
    if (typeof criarAvatar === "function") {
        avatar = criarAvatar(vencedor);
    }

    // 3. Coleta os dados para a planilha da coordenação
    const generoSel = document.querySelector('input[name="genero"]:checked')?.value || "";
    const tomPeleSel = document.querySelector('input[name="tomPele"]:checked')?.value || "";

    const dadosParaSalvar = {
        Nome: document.getElementById("nome")?.value.trim() || "",
        Apelido: document.getElementById("nickname")?.value.trim() || "",
        Celular: document.getElementById("celular")?.value.trim() || "",
        Email: document.getElementById("email")?.value.trim() || "",
        Idade: document.getElementById("idade")?.value.trim() || "",
        Genero: generoSel,
        TomPele: tomPeleSel,
        Area: vencedor,
        LinkAvatar: avatar ? (window.location.origin + "/" + avatar.imagem) : "",
        Data: new Date().toLocaleString("pt-BR")
    };

    // 4. Envia para o SheetMonkey
    enviarParaPlanilha(dadosParaSalvar);

    // 5. Esconde o quiz e mostra a seção de resultado
    const secaoQuiz = document.getElementById("quiz");
    const secaoDados = document.getElementById("perguntaDados");
    const secaoResultado = document.getElementById("resultado");

    if (secaoQuiz) secaoQuiz.style.display = "none";
    if (secaoDados) secaoDados.style.display = "none";

    if (secaoResultado) {
        secaoResultado.removeAttribute("hidden");
        secaoResultado.style.display = "block";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}


    /* =====================================================
       REGISTRO DE EVENTOS
       ===================================================== */

    const nome =
        document.getElementById("nome");

    const nickname =
        document.getElementById("nickname");

    const celular =
        document.getElementById("celular");

    const email =
        document.getElementById("email");

    const idade =
        document.getElementById("idade");


    const generos =
        document.querySelectorAll(
            'input[name="genero"]'
        );


    const tonsPele =
        document.querySelectorAll(
            'input[name="tomPele"]'
        );


    /* =====================================================
       CAMPOS DE TEXTO
       ===================================================== */

    if (nome) {

        nome.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (nickname) {

        nickname.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (celular) {

        celular.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (email) {

        email.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (idade) {

        idade.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    /* =====================================================
       TESTE DA BORDA — AO SAIR DO CAMPO
       ===================================================== */

    if (nome) {

        nome.addEventListener("blur", function () {

            const valido =
                nome.value.trim().length > 8;

            marcarCampo(nome, valido);
        });
    }


    if (nickname) {

        nickname.addEventListener("blur", function () {

            const valido =
                nickname.value.trim().length > 0;

            marcarCampo(nickname, valido);
        });
    }


    if (celular) {

        celular.addEventListener("blur", function () {

            const numeros =
                celular.value.replace(/\D/g, "");

            const valido =
                numeros.length >= 10;

            marcarCampo(celular, valido);
        });
    }


    if (email) {

        email.addEventListener("blur", function () {

            const valido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email.value.trim()
                );

            marcarCampo(email, valido);
        });
    }


    if (idade) {

        idade.addEventListener("blur", function () {

            const valido =
                idade.value.trim() !== "";

            marcarCampo(idade, valido);
        });
    }


    /* =====================================================
       GÊNERO
       ===================================================== */

    generos.forEach(genero => {

        genero.addEventListener(
            "change",
            atualizarBotoes
        );

    });


    /* =====================================================
       TOM DE PELE
       ===================================================== */

    tonsPele.forEach(tom => {

        tom.addEventListener(
            "change",
            atualizarBotoes
        );

    });


    /* =====================================================
       BOTÃO PRÓXIMO DOS DADOS PESSOAIS
       ===================================================== */

    const btnProximaDados =
        document.getElementById(
            "btnProximaDados"
        );


    if (btnProximaDados) {

        btnProximaDados.addEventListener(
            "click",
            proximaEtapa
        );
    }


    /* =====================================================
       BOTÕES DE AVANÇAR E VOLTAR
       ===================================================== */

    for (let i = 1; i <= totalPerguntas; i++) {

        const btnProxima =
            document.getElementById(
                `btnProxima${i}`
            );


        const btnVoltar =
            document.getElementById(
                `btnVoltar${i}`
            );


        if (btnProxima) {

            btnProxima.addEventListener(
                "click",
                proximaEtapa
            );
        }


        if (btnVoltar) {

            btnVoltar.addEventListener(
                "click",
                voltarEtapa
            );
        }


        /* Detectar mudanças nas opções */

        const pergunta =
            document.getElementById(
                `pergunta${i}`
            );


        if (pergunta) {

            const respostas =
                pergunta.querySelectorAll(
                    'input[type="radio"], input[type="checkbox"]'
                );


            respostas.forEach(resposta => {

                resposta.addEventListener(
                    "change",
                    atualizarBotoes
                );

            });
        }
    }


    /* =====================================================
       BOTÃO FINAL — VER PONTUAÇÃO
       ===================================================== */

    const btnVerPontuacao =
        document.getElementById(
            "btnVerPontuacao"
        );


    if (btnVerPontuacao) {

        btnVerPontuacao.addEventListener(
            "click",
            function () {

                if (etapaRespondida()) {
                    finalizarQuiz();
                }

            }
        );
    }


    /* =====================================================
       INICIALIZAÇÃO DO APP
       ===================================================== */

    mostrarEtapa(0);

});