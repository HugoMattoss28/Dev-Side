const classes = {
    programacao: {
        nome: "Programação",
        icone: "img/icon/dev_icon.png"
    },
    design: {
        nome: "Design",
        icone: "img/icon/designer_icon.png"
    },
    redes: {
        nome: "Redes e Internet",
        icone: "img/icon/redes_icon.png"
    },
    seguranca: {
        nome: "Cibersegurança",
        icone: "img/icon/ciber_icon.png"
    }
};


// ========================================
// 📊 PONTUAÇÃO DO PIXELU
// ========================================

const pontuacao = {

    // ========================================
    // QUESTÃO 01
    // ========================================

    q1: {

        // Extrovertido(a)
        q1a: {
            programacao: 1,
            design: 4,
            redes: 3,
            seguranca: 2,
        },

        // Introvertido(a)
        q1b: {
            programacao: 5,
            design: 4,
            redes: 2,
            seguranca: 3,
        }
    },


    // ========================================
    // QUESTÃO 02
    // ========================================

    q2: {

        // A aparência e as cores
        q2a: {
            programacao: 2,
            design: 5,
            redes: 3,
            seguranca: 1,
        },

        // As funções e ferramentas
        q2b: {
            programacao: 5,
            design: 3,
            redes: 4,
            seguranca: 5,
        },

        // A velocidade e o desempenho da página
        q2c: {
            programacao: 4,
            design: 2,
            redes: 5,
            seguranca: 3,
        },

        // A segurança e privacidade da página
        q2d: {
            programacao: 3,
            design: 2,
            redes: 4,
            seguranca: 4,
        }
    },


    // ========================================
    // QUESTÃO 03
    // ========================================

    q3: {

        // Criar um programa ou jogo
        q3a: {
            programacao: 5,
            design: 3,
            redes: 2,
            seguranca: 2,
        },

        // Criar uma interface bonita
        q3b: {
            programacao: 3,
            design: 5,
            redes: 1,
            seguranca: 1,
        },

        // Fazer computadores se conectarem
        q3c: {
            programacao: 2,
            design: 1,
            redes: 5,
            seguranca: 3,
        },

        // Descobrir e impedir uma invasão
        q3d: {
            programacao: 2,
            design: 1,
            redes: 4,
            seguranca: 5,
        },

        // Resolver um problema de computador
        q3e: {
            programacao: 2,
            design: 1,
            redes: 4,
            seguranca: 3,
        }
    },


    // ========================================
    // QUESTÃO 04
    // ========================================

    q4: {

        // Quero entender como ele funciona
        q4a: {
            programacao: 5,
            design: 1,
            redes: 3,
            seguranca: 2,
        },

        // Acho que a interface poderia ser melhor
        q4b: {
            programacao: 3,
            design: 5,
            redes: 2,
            seguranca: 1,
        },

        // Procuro uma forma de resolver o problema
        q4c: {
            programacao: 5,
            design: 1,
            redes: 2,
            seguranca: 2,
        }
    },


    // ========================================
    // QUESTÃO 05
    // ========================================

    q5: {

        // Sim, acho isso muito interessante
        q5a: {
            programacao: 2,
            design: 1,
            redes: 5,
            seguranca: 4,
        },

        // Nunca parei para pensar nisso
        q5b: {
            programacao: 3,
            design: 5,
            redes: 1,
            seguranca: 2,
        }
    },


    // ========================================
    // QUESTÃO 06
    // ========================================

    q6: {

        // Gosto de criar coisas novas
        q6a: {
            programacao: 5,
            design: 5,
            redes: 2,
            seguranca: 2,
        },

        // Gosto de resolver problemas
        q6b: {
            programacao: 5,
            design: 3,
            redes: 1,
            seguranca: 1,
        },

        // Gosto de ajudar outras pessoas
        q6c: {
            programacao: 3,
            design: 2,
            redes: 3,
            seguranca: 4,
        },

        // Gosto de descobrir como as coisas funcionam
        q6d: {
            programacao: 5,
            design: 3,
            redes: 4,
            seguranca: 3,
        }
    },


    // ========================================
    // QUESTÃO 07
    // ========================================

    q7: {

        // Aprender a programar
        q7a: {
            programacao: 5,
            design: 4,
            redes: 3,
            seguranca: 2,
        },

        // Criar designs e interfaces
        q7b: {
            programacao: 3,
            design: 5,
            redes: 1,
            seguranca: 1,
        },

        // Montar e configurar redes
        q7c: {
            programacao: 3,
            design: 1,
            redes: 5,
            seguranca: 4,
        },

        // Aprender sobre segurança digital
        q7d: {
            programacao: 1,
            design: 1,
            redes: 4,
            seguranca: 5,
        },

        // Aprender a configurar e solucionar problemas
        q7e: {
            programacao: 4,
            design: 2,
            redes: 4,
            seguranca: 3,
        }
    },


    // ========================================
    // QUESTÃO 08
    // ========================================

    q8: {

        // Sozinho(a), concentrado no meu trabalho
        q8a: {
            programacao: 5,
            design: 1,
            redes: 1,
            seguranca: 4,
        },

        // Em equipe, trocando ideias
        q8b: {
            programacao: 2,
            design: 4,
            redes: 5,
            seguranca: 3,
        },

        // Ajudando e conversando com pessoas
        q8c: {
            programacao: 2,
            design: 4,
            redes: 4,
            seguranca: 4,
        }
    },


    // ========================================
    // QUESTÃO 09
    // ========================================

    q9: {

        // Programação
        q9a: {
            programacao: 5,
            design: 4,
            redes: 1,
            seguranca: 1,
        },

        // Design e criação
        q9b: {
            programacao: 4,
            design: 5,
            redes: 1,
            seguranca: 1,
        },

        // Redes e Internet
        q9c: {
            programacao: 2,
            design: 2,
            redes: 5,
            seguranca: 4,
        },

        // Cibersegurança
        q9d: {
            programacao: 3,
            design: 1,
            redes: 4,
            seguranca: 5,
        },
    },


    // ========================================
    // QUESTÃO 10
    // ========================================

    q10: {

        // Criar algo que posso usar
        q10a: {
            programacao: 5,
            design: 5,
            redes: 1,
            seguranca: 1,
        },

        // Enfrentar um desafio
        q10b: {
            programacao: 4,
            design: 4,
            redes: 2,
            seguranca: 2,
        },

        // Descobrir como algo funciona
        q10c: {
            programacao: 4,
            design: 4,
            redes: 1,
            seguranca: 1,
        },

        // Poder ajudar alguém
        q10d: {
            programacao: 3,
            design: 1,
            redes: 4,
            seguranca: 2,
        },

        // Melhorar algo que já existe
        q10e: {
            programacao: 5,
            design: 4,
            redes: 3,
            seguranca: 2,
        },

        // Satisfazer minha curiosidade
        q10f: {
            programacao: 2,
            design: 3,
            redes: 5,
            seguranca: 2,
        }
    }
};


// ========================================
// RESULTADO
// ========================================

const resultado = {
    programacao: 0,
    design: 0,
    redes: 0,
    seguranca: 0
};


// ========================================
// SOMAR PONTOS
// ========================================

function somarPontos(pontos) {

    if (!pontos) return;

    resultado.programacao += pontos.programacao;
    resultado.design += pontos.design;
    resultado.redes += pontos.redes;
    resultado.seguranca += pontos.seguranca;
}


// ========================================
// QUESTÃO 1
// ========================================

function calcularQ1() {

    const resposta = document.querySelector(
        'input[name="q1"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q1[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 2
// PODE ESCOLHER VÁRIAS ALTERNATIVAS
// ========================================

function calcularQ2() {

    const respostas = document.querySelectorAll(
        'input[name="q2"]:checked'
    );

    respostas.forEach(resposta => {

        const pontos = pontuacao.q2[resposta.id];

        if (pontos) {
            somarPontos(pontos);
        }
    });
}


// ========================================
// QUESTÃO 3
// ========================================

function calcularQ3() {

    const resposta = document.querySelector(
        'input[name="q3"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q3[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 4
// ========================================

function calcularQ4() {

    const resposta = document.querySelector(
        'input[name="q4"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q4[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 5
// ========================================

function calcularQ5() {

    const resposta = document.querySelector(
        'input[name="q5"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q5[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 6
// ========================================

function calcularQ6() {

    const resposta = document.querySelector(
        'input[name="q6"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q6[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 7
// ========================================

function calcularQ7() {

    const resposta = document.querySelector(
        'input[name="q7"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q7[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 8
// ========================================

function calcularQ8() {

    const resposta = document.querySelector(
        'input[name="q8"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q8[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 9
// ========================================

function calcularQ9() {

    const resposta = document.querySelector(
        'input[name="q9"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q9[resposta.id];

    somarPontos(pontos);
}


// ========================================
// QUESTÃO 10
// ========================================

function calcularQ10() {

    const resposta = document.querySelector(
        'input[name="q10"]:checked'
    );

    if (!resposta) return;

    const pontos = pontuacao.q10[resposta.id];

    somarPontos(pontos);
}


// ========================================
// 📊 CALCULAR RESULTADO
// ========================================

function calcularResultado() {

    // Zera antes de calcular

    resultado.programacao = 0;
    resultado.design = 0;
    resultado.redes = 0;
    resultado.seguranca = 0;


    // Calcula as 10 perguntas

    calcularQ1();
    calcularQ2();
    calcularQ3();
    calcularQ4();
    calcularQ5();
    calcularQ6();
    calcularQ7();
    calcularQ8();
    calcularQ9();
    calcularQ10();


    console.log("========== PIXELU ==========");
    console.log("Programação:", resultado.programacao);
    console.log("Design:", resultado.design);
    console.log("Redes:", resultado.redes);
    console.log("Segurança:", resultado.seguranca);


    mostrarResultado();
}


// ========================================
// DESCOBRIR CLASSE
// ========================================

function descobrirVencedor() {

    let vencedor = "programacao";

    for (const classe in resultado) {

        if (resultado[classe] > resultado[vencedor]) {
            vencedor = classe;
        }
    }

    return vencedor;
}


// ========================================
// 🥈 DESCOBRIR SEGUNDA CLASSE
// ========================================

function descobrirSegundaClasse(vencedor) {

    let segunda = null;

    for (const classe in resultado) {

        if (classe === vencedor) {
            continue;
        }

        if (
            segunda === null ||
            resultado[classe] > resultado[segunda]
        ) {
            segunda = classe;
        }
    }

    return segunda;
}


// ========================================
// 📝 DESCRIÇÕES DO RESULTADO
// ========================================

function gerarDescricao(classe, xp, segundaClasse, xpSegunda) {

    let descricaoPrincipal = "";
    let toqueSegunda = "";


    // ========================================
    // CLASSE VENCEDORA
    // ========================================

    if (classe === "programacao") {

        if (xp >= 30) {

            descricaoPrincipal =
                "Você tende a transformar problemas em código: testa uma ideia, encontra o erro, ajusta e continua até fazer funcionar.";

        } else {

            descricaoPrincipal =
                "Você tem facilidade para pegar um problema confuso, quebrá-lo em partes menores e procurar uma solução que faça sentido.";
        }


    } else if (classe === "design") {

        if (xp >= 30) {

            descricaoPrincipal =
                "Você dificilmente aceita uma interface só porque ela funciona. Quer entender onde o usuário vai clicar, o que ele vai sentir e o que pode ser melhorado.";

        } else {

            descricaoPrincipal =
                "Você presta atenção em coisas que muita gente simplesmente ignora: organização, cores, posição dos elementos e facilidade de uso.";
        }


    } else if (classe === "redes") {

        if (xp >= 30) {

            descricaoPrincipal =
                "Seu perfil combina com quem gosta de descobrir onde uma conexão quebra, entender o caminho dos dados e fazer dispositivos, serviços e redes trabalharem juntos.";

        } else {

            descricaoPrincipal =
                "Você se interessa pelo caminho que existe entre os dispositivos: conexão, comunicação, servidores e tudo que faz a informação chegar ao destino.";
        }


    } else if (classe === "seguranca") {

        if (xp >= 30) {

            descricaoPrincipal =
                "Seu primeiro impulso é procurar a brecha: descobrir como um sistema poderia ser explorado, onde alguém poderia entrar e como impedir que isso aconteça.";

        } else {

            descricaoPrincipal =
                "Você tende a pensar no que pode dar errado antes de simplesmente confiar que está tudo certo.";
        }
    }


    // ========================================
    // SEGUNDA CLASSE
    // ========================================

    if (segundaClasse === "programacao") {

        if (xpSegunda >= 30) {

            toqueSegunda =
                "E essa curiosidade vai além de usar a tecnologia: você quer entender como ela é construída e o que faz cada parte funcionar.";

        } else {

            toqueSegunda =
                "Também apareceu uma curiosidade por entender o que existe por trás de um aplicativo, site ou sistema.";
        }


    } else if (segundaClasse === "design") {

        if (xpSegunda >= 30) {

            toqueSegunda =
                "E esse olhar aparece bastante: você pensa no caminho do usuário, nos detalhes da interface e no que pode tornar uma experiência mais natural.";

        } else {

            toqueSegunda =
                "Também existe um lado seu que se preocupa com a forma como uma ideia aparece para quem está usando.";
        }


    } else if (segundaClasse === "redes") {

        if (xpSegunda >= 30) {

            toqueSegunda =
                "E você parece ter aquela tendência de investigar a conexão de ponta a ponta até descobrir exatamente onde está o problema.";

        } else {

            toqueSegunda =
                "Também existe curiosidade pelo que acontece por trás de uma conexão quando algo deixa de funcionar.";
        }


    } else if (segundaClasse === "seguranca") {

        if (xpSegunda >= 30) {

            toqueSegunda =
                "E essa preocupação é bem marcada: você não olha apenas para o funcionamento do sistema, mas para todas as formas como ele poderia ser comprometido.";

        } else {

            toqueSegunda =
                "Também aparece uma preocupação em descobrir riscos antes que eles se transformem em problemas.";
        }
    }


    return {
        principal: descricaoPrincipal,
        segunda: toqueSegunda
    };
}


// ========================================
// 🎮 TABELA RPG
// ========================================

function mostrarResultado() {

    const areaResultado = document.getElementById("resultado");

    if (!areaResultado) {

        console.error(
            "Elemento #resultado não encontrado no HTML."
        );

        return;
    }


    const vencedor = descobrirVencedor();

    const segundaClasse = descobrirSegundaClasse(vencedor);


    // ========================================
    // GERA AS DESCRIÇÕES
    // ========================================

    const descricoes = gerarDescricao(
        vencedor,
        resultado[vencedor],
        segundaClasse,
        resultado[segundaClasse]
    );


    // ========================================
    // LISTA DAS CLASSES
    // ========================================

    const classesRPG = [
        "programacao",
        "design",
        "redes",
        "seguranca"
    ];


    // ========================================
    // GERA AS LINHAS DA TABELA
    // ========================================

    const linhasRPG = classesRPG.map(classe => {

        const xp = resultado[classe];


        /*
         * Cada pergunta pode dar até 5 pontos.
         * São 10 perguntas.
         * Máximo aproximado = 50 XP.
         *
         * Por isso:
         * 50 XP = 100%
         */

        const porcentagem = Math.min(xp * 2, 100);


        return `
            <div class="rpg-linha">

                <div class="rpg-classe">

                    <span class="icone-classe">
                        <img src="${classes[classe].icone}" alt="${classes[classe].nome}">
                    </span>

                    <span class="nome-classe">
                        ${classes[classe].nome}
                    </span>

                </div>


                <div class="rpg-xp">

                    <div class="barra-xp">

                        <div
                            class="barra-xp-preenchida"
                            style="width: ${porcentagem}%"
                        ></div>

                    </div>


                    <span class="rpg-pontos">
                        ${xp} XP
                    </span>

                </div>

            </div>
        `;

    }).join("");


    // ========================================
    // MONTA RESULTADO COMPLETO
    // ========================================

    areaResultado.innerHTML = `

        <div class="resultado-coluna-esquerda">

            <div
                class="avatar-card"
                id="avatarCard"
            ></div>


            <button
                type="button"
                class="btn-baixar-avatar"
                id="btnBaixarAvatar"
            >
                ⬇ Baixar minha imagem
            </button>

        </div>



        <div class="resultado-coluna-direita">

            <div class="classe-principal">

                <div class="icone">
                    <img
    src="${classes[vencedor].icone}"
    alt="${classes[vencedor].nome}"
>
                </div>


                <div class="titulo">
                    SUA CLASSE DevSide
                </div>


                <h3>
                    ${classes[vencedor].nome}
                </h3>


                <div class="pontos">
                    ${resultado[vencedor]} XP
                </div>


                <p class="rpg-descricao">
                    ${descricoes.principal}
                </p>


                <p class="rpg-descricao">
                    ${descricoes.segunda}
                </p>

            </div>



            <div class="tabela-rpg">

                <div class="tabela-rpg-titulo">
                    ⚔️ ATRIBUTOS DO PERSONAGEM
                </div>


                ${linhasRPG}

            </div>

        </div>

    `;
}


// ========================================
// 🏆 BOTÃO "VER MINHA PONTUAÇÃO"
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const btnVerPontuacao =
        document.getElementById("btnVerPontuacao");

    const quiz =
        document.getElementById("quiz");

    const resultadoArea =
        document.getElementById("resultado");


    if (!btnVerPontuacao) {

        console.error(
            "Botão #btnVerPontuacao não encontrado."
        );

        return;
    }


    btnVerPontuacao.addEventListener("click", function () {

        console.log("🎮 Abrindo resultado PixelU...");


        // ========================================
        // 1. CALCULA A PONTUAÇÃO
        // ========================================

        calcularResultado();


        // ========================================
        // 2. ESCONDE O QUIZ
        // ========================================

        if (quiz) {
            quiz.hidden = true;
        }


        // ========================================
        // 3. MOSTRA O RESULTADO
        // ========================================

        if (resultadoArea) {

            resultadoArea.hidden = false;


            resultadoArea.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});