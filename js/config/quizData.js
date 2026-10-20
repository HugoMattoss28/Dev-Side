/**
 * @file quizData.js
 * @description Configuração imutável das classes RPG (com Bootstrap Icons),
 *              perguntas do quiz, matriz de pontuação (XP) e textos de perfil.
 */

export const RPG_CLASSES = Object.freeze({
    programacao: {
        id: "programacao",
        name: "Programação",
        iconClass: "bi-code-slash",
        folderName: "Programacao",
        descriptions: {
            primaryHigh:
                "Você tende a transformar problemas em código: testa uma ideia, encontra o erro, ajusta e continua até fazer funcionar.",
            primaryNormal:
                "Você tem facilidade para pegar um problema confuso, quebrá-lo em partes menores e procurar uma solução que faça sentido.",
            secondaryHigh:
                "E essa curiosidade vai além de usar a tecnologia: você quer entender como ela é construída e o que faz cada parte funcionar.",
            secondaryNormal:
                "Também apareceu uma curiosidade por entender o que existe por trás de um aplicativo, site ou sistema."
        }
    },
    design: {
        id: "design",
        name: "Design",
        iconClass: "bi-palette2",
        folderName: "Design",
        descriptions: {
            primaryHigh:
                "Você dificilmente aceita uma interface só porque ela funciona. Quer entender onde o usuário vai clicar, o que ele vai sentir e o que pode ser melhorado.",
            primaryNormal:
                "Você presta atenção em coisas que muita gente simplesmente ignora: organização, cores, posição dos elementos e facilidade de uso.",
            secondaryHigh:
                "E esse olhar aparece bastante: você pensa no caminho do usuário, nos detalhes da interface e no que pode tornar uma experiência mais natural.",
            secondaryNormal:
                "Também existe um lado seu que se preocupa com a forma como uma ideia aparece para quem está usando."
        }
    },
    redes: {
        id: "redes",
        name: "Redes e Internet",
        iconClass: "bi-hdd-network",
        folderName: "Redes",
        descriptions: {
            primaryHigh:
                "Seu perfil combina com quem gosta de descobrir onde uma conexão quebra, entender o caminho dos dados e fazer dispositivos, serviços e redes trabalharem juntos.",
            primaryNormal:
                "Você se interessa pelo caminho que existe entre os dispositivos: conexão, comunicação, servidores e tudo que faz a informação chegar ao destino.",
            secondaryHigh:
                "E você parece ter aquela tendência de investigar a conexão de ponta a ponta até descobrir exatamente onde está o problema.",
            secondaryNormal:
                "Também existe curiosidade pelo que acontece por trás de uma conexão quando algo deixa de funcionar."
        }
    },
    seguranca: {
        id: "seguranca",
        name: "Cibersegurança",
        iconClass: "bi-shield-lock-fill",
        folderName: "Cibersegurança",
        descriptions: {
            primaryHigh:
                "Seu primeiro impulso é procurar a brecha: descobrir como um sistema poderia ser explorado, onde alguém poderia entrar e como impedir que isso aconteça.",
            primaryNormal:
                "Você tende a pensar no que pode dar errado antes de simplesmente confiar que está tudo certo.",
            secondaryHigh:
                "E essa preocupação é bem marcada: você não olha apenas para o funcionamento do sistema, mas para todas as formas como ele poderia ser comprometido.",
            secondaryNormal:
                "Também aparece uma preocupação em descobrir riscos antes que eles se transformem em problemas."
        }
    }
});

export const IDENTITY_OPTIONS = Object.freeze([
    {
        id: "generoMasculino",
        value: "masculino",
        label: "Masculino",
        iconClass: "bi-gender-male",
        variantClass: "identity-option__card--male"
    },
    {
        id: "generoFeminino",
        value: "feminino",
        label: "Feminino",
        iconClass: "bi-gender-female",
        variantClass: "identity-option__card--female"
    },
    {
        id: "generoTrans",
        value: "trans",
        label: "Outros/Prefiro não informar",
        iconClass: "bi-gender-trans",
        variantClass: "identity-option__card--trans"
    }
]);

export const SKIN_TONE_OPTIONS = Object.freeze([
    {
        id: "tomPeleClara",
        value: "clara",
        label: "Pele Clara",
        swatchClass: "skin-option__swatch--clara"
    },
    {
        id: "tomPeleEscura",
        value: "escura",
        label: "Pele Escura",
        swatchClass: "skin-option__swatch--escura"
    }
]);

export const QUIZ_QUESTIONS = Object.freeze([
    {
        step: 1,
        id: "q1",
        type: "single",
        title: "01. Você é uma pessoa extrovertida ou introvertida?",
        options: [
            {
                id: "q1a",
                value: "extrovertido",
                label: "Extrovertido(a)",
                scores: { programacao: 1, design: 4, redes: 3, seguranca: 2 }
            },
            {
                id: "q1b",
                value: "introvertido",
                label: "Introvertido(a)",
                scores: { programacao: 5, design: 4, redes: 2, seguranca: 3 }
            }
        ]
    },
    {
        step: 2,
        id: "q2",
        type: "multiple",
        title: "02. O que costuma chamar sua atenção ao acessar aplicativos ou sites?",
        hint: "Você pode selecionar mais de uma alternativa",
        options: [
            {
                id: "q2a",
                value: "visual",
                label: "A aparência e as cores",
                scores: { programacao: 2, design: 5, redes: 3, seguranca: 1 }
            },
            {
                id: "q2b",
                value: "funcionalidade",
                label: "As funções, ferramentas e como funciona",
                scores: { programacao: 5, design: 3, redes: 4, seguranca: 5 }
            },
            {
                id: "q2c",
                value: "velocidade",
                label: "A velocidade e o desempenho da página",
                scores: { programacao: 4, design: 2, redes: 5, seguranca: 3 }
            },
            {
                id: "q2d",
                value: "seguranca",
                label: "A segurança e privacidade da página",
                scores: { programacao: 3, design: 2, redes: 4, seguranca: 4 }
            }
        ]
    },
    {
        step: 3,
        id: "q3",
        type: "single",
        title: "03. Qual desses desafios parece ser mais divertido?",
        options: [
            {
                id: "q3a",
                value: "programar",
                label: "Criar um programa ou jogo",
                scores: { programacao: 5, design: 3, redes: 2, seguranca: 2 }
            },
            {
                id: "q3b",
                value: "design",
                label: "Criar uma interface bonita",
                scores: { programacao: 3, design: 5, redes: 1, seguranca: 1 }
            },
            {
                id: "q3c",
                value: "rede",
                label: "Fazer computadores se conectarem",
                scores: { programacao: 2, design: 1, redes: 5, seguranca: 3 }
            },
            {
                id: "q3d",
                value: "seguranca",
                label: "Descobrir e impedir uma invasão",
                scores: { programacao: 2, design: 1, redes: 4, seguranca: 5 }
            },
            {
                id: "q3e",
                value: "suporte",
                label: "Resolver um problema de computador",
                scores: { programacao: 2, design: 1, redes: 4, seguranca: 3 }
            }
        ]
    },
    {
        step: 4,
        id: "q4",
        type: "single",
        title: "04. Quando você tem dificuldade para usar um site ou aplicativo, qual é a primeira coisa que vem à sua cabeça?",
        options: [
            {
                id: "q4a",
                value: "entender",
                label: "Quero entender como ele funciona",
                scores: { programacao: 5, design: 1, redes: 3, seguranca: 2 }
            },
            {
                id: "q4b",
                value: "interface",
                label: "Acho que a interface poderia ser melhor",
                scores: { programacao: 3, design: 5, redes: 2, seguranca: 1 }
            },
            {
                id: "q4c",
                value: "ajuda",
                label: "Procuro uma forma de resolver o problema",
                scores: { programacao: 5, design: 1, redes: 2, seguranca: 2 }
            }
        ]
    },
    {
        step: 5,
        id: "q5",
        type: "single",
        title: "05. Você já ficou curioso(a) sobre como a internet conecta pessoas e permite que você acesse sites e aplicativos de qualquer lugar?",
        options: [
            {
                id: "q5a",
                value: "sim",
                label: "Sim, acho isso muito interessante",
                scores: { programacao: 2, design: 1, redes: 5, seguranca: 4 }
            },
            {
                id: "q5b",
                value: "nao",
                label: "Nunca parei para pensar nisso",
                scores: { programacao: 3, design: 5, redes: 1, seguranca: 2 }
            }
        ]
    },
    {
        step: 6,
        id: "q6",
        type: "single",
        title: "06. Qual dessas frases mais combina com você?",
        options: [
            {
                id: "q6a",
                value: "criar",
                label: "Gosto de criar coisas novas",
                scores: { programacao: 5, design: 5, redes: 2, seguranca: 2 }
            },
            {
                id: "q6b",
                value: "resolver",
                label: "Gosto de resolver problemas",
                scores: { programacao: 5, design: 3, redes: 1, seguranca: 1 }
            },
            {
                id: "q6c",
                value: "ajudar",
                label: "Gosto de ajudar outras pessoas",
                scores: { programacao: 3, design: 2, redes: 3, seguranca: 4 }
            },
            {
                id: "q6d",
                value: "explorar",
                label: "Gosto de descobrir como as coisas funcionam",
                scores: { programacao: 5, design: 3, redes: 4, seguranca: 3 }
            }
        ]
    },
    {
        step: 7,
        id: "q7",
        type: "single",
        title: "07. Se pudesse aprender uma coisa nova sobre tecnologia, o que escolheria?",
        options: [
            {
                id: "q7a",
                value: "programacao",
                label: "Aprender a programar",
                scores: { programacao: 5, design: 4, redes: 3, seguranca: 2 }
            },
            {
                id: "q7b",
                value: "design",
                label: "Criar designs e interfaces",
                scores: { programacao: 3, design: 5, redes: 1, seguranca: 1 }
            },
            {
                id: "q7c",
                value: "redes",
                label: "Montar e configurar redes",
                scores: { programacao: 3, design: 1, redes: 5, seguranca: 4 }
            },
            {
                id: "q7d",
                value: "seguranca",
                label: "Aprender sobre segurança digital",
                scores: { programacao: 1, design: 1, redes: 4, seguranca: 5 }
            },
            {
                id: "q7e",
                value: "suporte",
                label: "Aprender a configurar e solucionar problemas",
                scores: { programacao: 4, design: 2, redes: 4, seguranca: 3 }
            }
        ]
    },
    {
        step: 8,
        id: "q8",
        type: "single",
        title: "08. Como você prefere trabalhar?",
        options: [
            {
                id: "q8a",
                value: "sozinho",
                label: "Sozinho(a), concentrado no meu trabalho",
                scores: { programacao: 5, design: 1, redes: 1, seguranca: 4 }
            },
            {
                id: "q8b",
                value: "equipe",
                label: "Em equipe, trocando ideias",
                scores: { programacao: 2, design: 4, redes: 5, seguranca: 3 }
            },
            {
                id: "q8c",
                value: "pessoas",
                label: "Ajudando e conversando com pessoas",
                scores: { programacao: 2, design: 4, redes: 4, seguranca: 4 }
            }
        ]
    },
    {
        step: 9,
        id: "q9",
        type: "single",
        title: "09. Qual dessas áreas mais desperta sua curiosidade?",
        options: [
            {
                id: "q9a",
                value: "programacao",
                label: "Programação",
                scores: { programacao: 5, design: 4, redes: 1, seguranca: 1 }
            },
            {
                id: "q9b",
                value: "design",
                label: "Design e criação",
                scores: { programacao: 4, design: 5, redes: 1, seguranca: 1 }
            },
            {
                id: "q9c",
                value: "redes",
                label: "Redes e Internet",
                scores: { programacao: 2, design: 2, redes: 5, seguranca: 4 }
            },
            {
                id: "q9d",
                value: "seguranca",
                label: "Cibersegurança",
                scores: { programacao: 3, design: 1, redes: 4, seguranca: 5 }
            }
        ]
    },
    {
        step: 10,
        id: "q10",
        type: "single",
        title: "10. O que mais te motiva quando aprende algo novo?",
        options: [
            {
                id: "q10a",
                value: "criar",
                label: "Criar algo que posso usar",
                scores: { programacao: 5, design: 5, redes: 1, seguranca: 1 }
            },
            {
                id: "q10b",
                value: "desafio",
                label: "Enfrentar um desafio",
                scores: { programacao: 4, design: 4, redes: 2, seguranca: 2 }
            },
            {
                id: "q10c",
                value: "descoberta",
                label: "Descobrir como algo funciona",
                scores: { programacao: 4, design: 4, redes: 1, seguranca: 1 }
            },
            {
                id: "q10d",
                value: "ajudar",
                label: "Poder ajudar alguém",
                scores: { programacao: 3, design: 1, redes: 4, seguranca: 2 }
            },
            {
                id: "q10e",
                value: "melhorar",
                label: "Melhorar algo que já existe",
                scores: { programacao: 5, design: 4, redes: 3, seguranca: 2 }
            },
            {
                id: "q10f",
                value: "curiosidade",
                label: "Satisfazer minha curiosidade",
                scores: { programacao: 2, design: 3, redes: 5, seguranca: 2 }
            }
        ]
    }
]);

