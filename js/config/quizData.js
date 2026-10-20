/**
 * @file quizData.js
 * @description Configuração imutável das 3 Trilhas (TI, Agronegócio e Gestão Empresarial),
 *              suas respectivas classes RPG (com Bootstrap Icons), textos de perfil
 *              e os 3 quizzes completos de 10 perguntas cada.
 */

export const TRACK_OPTIONS = Object.freeze([
    {
        id: "trackTi",
        value: "ti",
        label: "Tecnologia (TI)",
        subtitle: "Código, Design, Redes & Cibersegurança",
        iconClass: "bi-cpu-fill",
        variantClass: "identity-option__card--male"
    },
    {
        id: "trackAgro",
        value: "agro",
        label: "Agronegócio",
        subtitle: "AgroTech, Produção, Sustentabilidade & Pesquisa",
        iconClass: "bi-tree-fill",
        variantClass: "identity-option__card--agro"
    },
    {
        id: "trackGestao",
        value: "gestao",
        label: "Gestão Empresarial",
        subtitle: "Liderança, Finanças, Marketing & Operações",
        iconClass: "bi-graph-up-arrow",
        variantClass: "identity-option__card--gestao"
    }
]);

export const RPG_CLASSES = Object.freeze({
    // =========================================================================
    // TRILHA 1: TECNOLOGIA DA INFORMAÇÃO (TI)
    // =========================================================================
    programacao: {
        id: "programacao",
        track: "ti",
        name: "Programação",
        iconClass: "bi-code-slash",
        folderName: "tecnologia/Programacao",
        fallbackFolderName: "tecnologia/Programacao",
        fallbackAreaKey: "programacao",
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
        track: "ti",
        name: "Design",
        iconClass: "bi-palette2",
        folderName: "tecnologia/Design",
        fallbackFolderName: "tecnologia/Design",
        fallbackAreaKey: "design",
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
        track: "ti",
        name: "Redes e Internet",
        iconClass: "bi-hdd-network",
        folderName: "tecnologia/Redes",
        fallbackFolderName: "tecnologia/Redes",
        fallbackAreaKey: "redes",
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
        track: "ti",
        name: "Cibersegurança",
        iconClass: "bi-shield-lock-fill",
        folderName: "tecnologia/Cibersegurança",
        fallbackFolderName: "tecnologia/Cibersegurança",
        fallbackAreaKey: "seguranca",
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
    },

    // =========================================================================
    // TRILHA 2: AGRONEGÓCIO / ENGENHARIA AGRONÔMICA (classesAgro.md)
    // =========================================================================
    agrotech: {
        id: "agrotech",
        track: "agro",
        name: "AgroTech — O Inovador",
        iconClass: "bi-cpu-fill",
        folderName: "agronegocio/AgroTech",
        fallbackFolderName: "tecnologia/Programacao",
        fallbackAreaKey: "programacao",
        descriptions: {
            primaryHigh:
                "Você gosta de transformar ideias em soluções para o campo. Na Engenharia Agronômica, inovação e tecnologia caminham juntas com drones, sensores e agricultura digital!",
            primaryNormal:
                "Você gosta de transformar ideias em soluções para o campo. Na Engenharia Agronômica, inovação e tecnologia caminham juntas!",
            secondaryHigh:
                "Além disso, você tem forte afinidade com agricultura 4.0, automação, drones e análise de dados aplicados ao campo.",
            secondaryNormal:
                "Também apareceu um interesse claro por levar inovação tecnológica e ferramentas digitais para o agronegócio."
        }
    },
    agroprod: {
        id: "agroprod",
        track: "agro",
        name: "AgroProd — O Especialista em Produção",
        iconClass: "bi-flower1",
        folderName: "agronegocio/AgroProd",
        fallbackFolderName: "tecnologia/Redes",
        fallbackAreaKey: "redes",
        descriptions: {
            primaryHigh:
                "Você gosta de ver as coisas crescerem e acontecerem. Seu lado Agro combina diretamente com o manejo de culturas, produção de alimentos e liderança prática no campo!",
            primaryNormal:
                "Você gosta de ver as coisas crescerem e acontecerem. Seu lado Agro combina com a produção de alimentos e o trabalho no campo!",
            secondaryHigh:
                "E esse perfil se soma a uma grande energia prática: colocar a mão na massa, acompanhar o ciclo das plantas e garantir colheitas de excelência.",
            secondaryNormal:
                "Também existe em você um gosto prático por acompanhar o desenvolvimento das lavouras e a produção no dia a dia."
        }
    },
    agroeco: {
        id: "agroeco",
        track: "agro",
        name: "AgroEco — O Guardião Ambiental",
        iconClass: "bi-globe-americas",
        folderName: "agronegocio/AgroEco",
        fallbackFolderName: "tecnologia/Design",
        fallbackAreaKey: "design",
        descriptions: {
            primaryHigh:
                "Você pensa no futuro do planeta. A Engenharia Agronômica também cuida do solo, da água e da produção sustentável, unindo alta produtividade e preservação ambiental!",
            primaryNormal:
                "Você pensa no futuro do planeta. A Engenharia Agronômica também cuida do solo, da água e da produção sustentável!",
            secondaryHigh:
                "Sua visão também valoriza profundamente o equilíbrio ecológico, a conservação dos recursos naturais e o manejo regenerativo.",
            secondaryNormal:
                "Também se destacou a sua preocupação com a sustentabilidade e o uso responsável da água e do solo."
        }
    },
    agrolab: {
        id: "agrolab",
        track: "agro",
        name: "AgroLab — O Investigador",
        iconClass: "bi-eyedropper",
        folderName: "agronegocio/AgroLab",
        fallbackFolderName: "tecnologia/Cibersegurança",
        fallbackAreaKey: "seguranca",
        descriptions: {
            primaryHigh:
                "Sua curiosidade pode virar descoberta. Experimentos, biotecnologia, melhoramento genético e ciência ajudam a encontrar soluções para os maiores desafios do agro!",
            primaryNormal:
                "Sua curiosidade pode virar descoberta. Experimentos e ciência ajudam a encontrar soluções para os desafios do agro!",
            secondaryHigh:
                "Você também demonstra um olhar científico apurado, gostando de investigar causas, testar hipóteses em laboratório e analisar resultados.",
            secondaryNormal:
                "Também apareceu uma curiosidade científica por entender a biologia e a química por trás do desenvolvimento das plantas."
        }
    },

    // =========================================================================
    // TRILHA 3: GESTÃO EMPRESARIAL
    // =========================================================================
    lideranca: {
        id: "lideranca",
        track: "gestao",
        name: "GestãoPeople — O Líder Estratégico",
        iconClass: "bi-people-fill",
        folderName: "gestao/Lideranca",
        fallbackFolderName: "tecnologia/Design",
        fallbackAreaKey: "design",
        descriptions: {
            primaryHigh:
                "Você tem talento natural para conectar talentos, inspirar equipes e conduzir negociações. Na Gestão Empresarial, grandes resultados começam pelas pessoas!",
            primaryNormal:
                "Você gosta de lidar com pessoas, organizar talentos e criar um ambiente onde toda a equipe consiga dar o seu melhor.",
            secondaryHigh:
                "Além disso, sua inteligência interpessoal e capacidade de comunicação ajudam a engajar times em torno de qualquer meta.",
            secondaryNormal:
                "Também apareceu facilidade para ouvir, colaborar e coordenar pessoas em projetos em grupo."
        }
    },
    financas: {
        id: "financas",
        track: "gestao",
        name: "GestãoFin — O Estrategista Financeiro",
        iconClass: "bi-cash-coin",
        folderName: "gestao/Financas",
        fallbackFolderName: "tecnologia/Cibersegurança",
        fallbackAreaKey: "seguranca",
        descriptions: {
            primaryHigh:
                "Seu raciocínio é analítico e focado em viabilidade, investimentos e retorno. Você enxerga nos números o mapa para fazer qualquer empresa crescer com segurança!",
            primaryNormal:
                "Você gosta de planejar recursos, analisar custos e tomar decisões baseadas em dados concretos e metas claras.",
            secondaryHigh:
                "Esse perfil é reforçado por um forte senso de controle financeiro, análise de riscos e visão de rentabilidade.",
            secondaryNormal:
                "Também existe um cuidado importante com o planejamento financeiro e o uso inteligente dos recursos."
        }
    },
    marketing: {
        id: "marketing",
        track: "gestao",
        name: "GestãoMkt — O Visionário de Mercado",
        iconClass: "bi-megaphone-fill",
        folderName: "gestao/Marketing",
        fallbackFolderName: "tecnologia/Programacao",
        fallbackAreaKey: "programacao",
        descriptions: {
            primaryHigh:
                "Você enxerga oportunidades onde ninguém mais vê! Criação de marcas, comportamento do consumidor, vendas e inovação de negócios fazem parte do seu DNA empreendedor.",
            primaryNormal:
                "Você tem perfil criativo e comercial, gostando de entender o que atrai os clientes e como destacar uma ideia no mercado.",
            secondaryHigh:
                "E você combina isso com uma visão empreendedora forte, sempre pensando em como divulgar, posicionar e escalar novos produtos.",
            secondaryNormal:
                "Também apareceu interesse por comunicação, tendências de mercado e criação de novos negócios."
        }
    },
    operacoes: {
        id: "operacoes",
        track: "gestao",
        name: "GestãoOps — O Mestre de Processos",
        iconClass: "bi-diagram-3-fill",
        folderName: "gestao/Operacoes",
        fallbackFolderName: "tecnologia/Redes",
        fallbackAreaKey: "redes",
        descriptions: {
            primaryHigh:
                "Você não sossega enquanto tudo não estiver funcionando como um relógio! Logística, eficiência operacional, gestão de projetos e qualidade são a sua especialidade.",
            primaryNormal:
                "Você gosta de organização prática, fluxo de trabalho bem definido e soluções que eliminam desperdícios de tempo e esforço.",
            secondaryHigh:
                "E esse talento é potencializado pela sua capacidade de estruturar processos, prazos e cadeias logísticas de ponta a ponta.",
            secondaryNormal:
                "Também se destacou sua atenção à organização, planejamento de etapas e melhoria contínua."
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
        label: "Outro / Prefiro não informar",
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

export const QUIZ_QUESTIONS_BY_TRACK = Object.freeze({
    // =========================================================================
    // QUIZ 1: TECNOLOGIA DA INFORMAÇÃO (TI) — 10 PERGUNTAS (regras/perguntasTI.txt)
    // Pontuação balanceada de forma justa entre Programação, Design, Redes e Cibersegurança
    // =========================================================================
    ti: [
        {
            step: 1,
            id: "q1",
            type: "single",
            title: "01. Você se considera:",
            options: [
                {
                    id: "q1a",
                    value: "extrovertido",
                    label: "Extrovertido(a)",
                    scores: { programacao: 2, design: 5, redes: 4, seguranca: 2 }
                },
                {
                    id: "q1b",
                    value: "introvertido",
                    label: "Introvertido(a)",
                    scores: { programacao: 5, design: 2, redes: 3, seguranca: 5 }
                }
            ]
        },
        {
            step: 2,
            id: "q2",
            type: "multiple",
            title: "02. O que mais chama sua atenção em um site?",
            hint: "Você pode selecionar mais de uma alternativa",
            options: [
                {
                    id: "q2a",
                    value: "visual",
                    label: "Visual e cores",
                    scores: { programacao: 1, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q2b",
                    value: "funcionalidade",
                    label: "Funcionalidades",
                    scores: { programacao: 5, design: 2, redes: 2, seguranca: 2 }
                },
                {
                    id: "q2c",
                    value: "velocidade",
                    label: "Velocidade",
                    scores: { programacao: 2, design: 1, redes: 5, seguranca: 2 }
                },
                {
                    id: "q2d",
                    value: "seguranca",
                    label: "Segurança",
                    scores: { programacao: 2, design: 1, redes: 2, seguranca: 5 }
                }
            ]
        },
        {
            step: 3,
            id: "q3",
            type: "single",
            title: "03. Qual desafio você prefere?",
            options: [
                {
                    id: "q3a",
                    value: "programar",
                    label: "Criar programas ou jogos",
                    scores: { programacao: 5, design: 2, redes: 1, seguranca: 1 }
                },
                {
                    id: "q3b",
                    value: "design",
                    label: "Criar interfaces",
                    scores: { programacao: 2, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q3c",
                    value: "rede",
                    label: "Conectar computadores",
                    scores: { programacao: 1, design: 1, redes: 5, seguranca: 2 }
                },
                {
                    id: "q3d",
                    value: "seguranca",
                    label: "Impedir invasões",
                    scores: { programacao: 2, design: 1, redes: 2, seguranca: 5 }
                },
                {
                    id: "q3e",
                    value: "suporte",
                    label: "Resolver problemas técnicos",
                    scores: { programacao: 2, design: 1, redes: 5, seguranca: 4 }
                }
            ]
        },
        {
            step: 4,
            id: "q4",
            type: "single",
            title: "04. Quando um site apresenta problemas, você:",
            options: [
                {
                    id: "q4a",
                    value: "entender",
                    label: "Tenta entender o funcionamento",
                    scores: { programacao: 5, design: 1, redes: 3, seguranca: 4 }
                },
                {
                    id: "q4b",
                    value: "interface",
                    label: "Pensa em melhorar o visual",
                    scores: { programacao: 1, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q4c",
                    value: "ajuda",
                    label: "Busca uma solução",
                    scores: { programacao: 2, design: 1, redes: 5, seguranca: 4 }
                }
            ]
        },
        {
            step: 5,
            id: "q5",
            type: "single",
            title: "05. Você tem curiosidade sobre como a internet funciona?",
            options: [
                {
                    id: "q5a",
                    value: "sim",
                    label: "Sim",
                    scores: { programacao: 2, design: 1, redes: 5, seguranca: 5 }
                },
                {
                    id: "q5b",
                    value: "nao",
                    label: "Não",
                    scores: { programacao: 5, design: 5, redes: 1, seguranca: 1 }
                }
            ]
        },
        {
            step: 6,
            id: "q6",
            type: "single",
            title: "06. O que mais combina com você?",
            options: [
                {
                    id: "q6a",
                    value: "criar",
                    label: "Criar coisas",
                    scores: { programacao: 4, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q6b",
                    value: "resolver",
                    label: "Resolver problemas",
                    scores: { programacao: 5, design: 2, redes: 3, seguranca: 3 }
                },
                {
                    id: "q6c",
                    value: "ajudar",
                    label: "Ajudar pessoas",
                    scores: { programacao: 1, design: 3, redes: 4, seguranca: 5 }
                },
                {
                    id: "q6d",
                    value: "explorar",
                    label: "Entender como tudo funciona",
                    scores: { programacao: 3, design: 1, redes: 5, seguranca: 4 }
                }
            ]
        },
        {
            step: 7,
            id: "q7",
            type: "single",
            title: "07. O que gostaria de aprender?",
            options: [
                {
                    id: "q7a",
                    value: "programacao",
                    label: "Programação",
                    scores: { programacao: 5, design: 2, redes: 1, seguranca: 1 }
                },
                {
                    id: "q7b",
                    value: "design",
                    label: "Design",
                    scores: { programacao: 1, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q7c",
                    value: "redes",
                    label: "Redes",
                    scores: { programacao: 1, design: 1, redes: 5, seguranca: 2 }
                },
                {
                    id: "q7d",
                    value: "seguranca",
                    label: "Segurança digital",
                    scores: { programacao: 1, design: 1, redes: 2, seguranca: 5 }
                },
                {
                    id: "q7e",
                    value: "suporte",
                    label: "Suporte técnico",
                    scores: { programacao: 2, design: 1, redes: 5, seguranca: 4 }
                }
            ]
        },
        {
            step: 8,
            id: "q8",
            type: "single",
            title: "08. Como prefere trabalhar?",
            options: [
                {
                    id: "q8a",
                    value: "sozinho",
                    label: "Sozinho(a)",
                    scores: { programacao: 5, design: 2, redes: 2, seguranca: 5 }
                },
                {
                    id: "q8b",
                    value: "equipe",
                    label: "Em equipe",
                    scores: { programacao: 3, design: 5, redes: 4, seguranca: 2 }
                },
                {
                    id: "q8c",
                    value: "pessoas",
                    label: "Atendendo pessoas",
                    scores: { programacao: 1, design: 4, redes: 5, seguranca: 3 }
                }
            ]
        },
        {
            step: 9,
            id: "q9",
            type: "single",
            title: "09. Qual área mais te interessa?",
            options: [
                {
                    id: "q9a",
                    value: "programacao",
                    label: "Programação",
                    scores: { programacao: 5, design: 1, redes: 1, seguranca: 1 }
                },
                {
                    id: "q9b",
                    value: "design",
                    label: "Design",
                    scores: { programacao: 1, design: 5, redes: 1, seguranca: 1 }
                },
                {
                    id: "q9c",
                    value: "redes",
                    label: "Redes",
                    scores: { programacao: 1, design: 1, redes: 5, seguranca: 2 }
                },
                {
                    id: "q9d",
                    value: "seguranca",
                    label: "Cibersegurança",
                    scores: { programacao: 1, design: 1, redes: 2, seguranca: 5 }
                }
            ]
        },
        {
            step: 10,
            id: "q10",
            type: "single",
            title: "10. O que mais te motiva a aprender?",
            options: [
                {
                    id: "q10a",
                    value: "criar",
                    label: "Criar algo útil",
                    scores: { programacao: 5, design: 5, redes: 2, seguranca: 1 }
                },
                {
                    id: "q10b",
                    value: "desafio",
                    label: "Superar desafios",
                    scores: { programacao: 4, design: 2, redes: 3, seguranca: 5 }
                },
                {
                    id: "q10c",
                    value: "descoberta",
                    label: "Entender como funciona",
                    scores: { programacao: 4, design: 1, redes: 5, seguranca: 4 }
                },
                {
                    id: "q10d",
                    value: "ajudar",
                    label: "Ajudar pessoas",
                    scores: { programacao: 2, design: 4, redes: 4, seguranca: 4 }
                },
                {
                    id: "q10e",
                    value: "melhorar",
                    label: "Melhorar algo",
                    scores: { programacao: 3, design: 5, redes: 4, seguranca: 3 }
                },
                {
                    id: "q10f",
                    value: "curiosidade",
                    label: "Matar a curiosidade",
                    scores: { programacao: 3, design: 2, redes: 4, seguranca: 5 }
                }
            ]
        }
    ],

    // =========================================================================
    // QUIZ 2: AGRONEGÓCIO — 08 PERGUNTAS E MATRIZ OFICIAL (regras/perguntasAgro.txt)
    // Classes: agrotech, agroprod, agroeco, agrolab
    // =========================================================================
    agro: [
        {
            step: 1,
            id: "q1",
            type: "single",
            title: "01. Se você pudesse escolher uma missão, qual seria?",
            options: [
                {
                    id: "q1a",
                    value: "criar_tech",
                    label: "Criar tecnologias para facilitar a vida",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q1b",
                    value: "produzir_alimentos",
                    label: "Produzir alimentos de forma sustentável",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q1c",
                    value: "cuidar_natureza",
                    label: "Cuidar da natureza e dos recursos naturais",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 1, agrolab: 0 }
                },
                {
                    id: "q1d",
                    value: "descobrir_solucoes",
                    label: "Descobrir soluções para grandes desafios",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                }
            ]
        },
        {
            step: 2,
            id: "q2",
            type: "single",
            title: "02. Você visita uma fazenda supertecnológica. O que chama sua atenção?",
            options: [
                {
                    id: "q2a",
                    value: "drones_equipamentos",
                    label: "Os drones e equipamentos inteligentes",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q2b",
                    value: "plantacoes_cultivos",
                    label: "As plantações e os diferentes cultivos",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q2c",
                    value: "preservacao_agua",
                    label: "A preservação das florestas e da água",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 1, agrolab: 0 }
                },
                {
                    id: "q2d",
                    value: "experimentos_descobertas",
                    label: "Os experimentos e as novas descobertas",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                }
            ]
        },
        {
            step: 3,
            id: "q3",
            type: "single",
            title: "03. Um produtor está com problemas na plantação. O que você faria?",
            options: [
                {
                    id: "q3a",
                    value: "investigar_causa",
                    label: "Investigaria a causa do problema",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                },
                {
                    id: "q3b",
                    value: "solucao_tecnologica",
                    label: "Procuraria uma solução tecnológica",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q3c",
                    value: "conversar_experientes",
                    label: "Conversaria com pessoas experientes",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q3d",
                    value: "testar_alternativas",
                    label: "Testaria diferentes alternativas",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                }
            ]
        },
        {
            step: 4,
            id: "q4",
            type: "single",
            title: "04. Qual dessas experiências você gostaria de viver?",
            options: [
                {
                    id: "q4a",
                    value: "pilotar_drone",
                    label: "Pilotar um drone sobre uma lavoura",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q4b",
                    value: "cultivar_estufa",
                    label: "Cultivar alimentos em uma estufa",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q4c",
                    value: "analisar_amostras",
                    label: "Analisar amostras em um laboratório",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                },
                {
                    id: "q4d",
                    value: "projeto_ambiental",
                    label: "Participar de um projeto ambiental",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 1, agrolab: 0 }
                }
            ]
        },
        {
            step: 5,
            id: "q5",
            type: "single",
            title: "05. Se você pudesse inventar algo para o futuro, o que seria?",
            options: [
                {
                    id: "q5a",
                    value: "maquina_autonoma",
                    label: "Uma máquina que trabalha sozinha no campo",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q5b",
                    value: "planta_resistente",
                    label: "Uma planta mais resistente ao calor",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                },
                {
                    id: "q5c",
                    value: "economia_agua",
                    label: "Uma tecnologia que economiza água",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 1, agrolab: 0 }
                },
                {
                    id: "q5d",
                    value: "app_produtores",
                    label: "Um aplicativo que ajuda os produtores",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                }
            ]
        },
        {
            step: 6,
            id: "q6",
            type: "single",
            title: "06. Em um trabalho em equipe, qual papel mais combina com você?",
            options: [
                {
                    id: "q6a",
                    value: "ideias_criativas",
                    label: "Ter ideias criativas e inovadoras",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q6b",
                    value: "organizar_planejar",
                    label: "Organizar e planejar as atividades",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q6c",
                    value: "mao_na_massa",
                    label: "Colocar a mão na massa",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q6d",
                    value: "analisar_resultados",
                    label: "Analisar os resultados e propor melhorias",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                }
            ]
        },
        {
            step: 7,
            id: "q7",
            type: "single",
            title: "07. Qual desses desafios você gostaria de ajudar a resolver?",
            options: [
                {
                    id: "q7a",
                    value: "produzir_mais",
                    label: "Produzir mais alimentos com menos recursos",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q7b",
                    value: "reduzir_impactos",
                    label: "Reduzir os impactos ambientais",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 1, agrolab: 0 }
                },
                {
                    id: "q7c",
                    value: "levar_tecnologia",
                    label: "Levar tecnologia para as propriedades rurais",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q7d",
                    value: "melhorar_qualidade",
                    label: "Melhorar a qualidade dos alimentos",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                }
            ]
        },
        {
            step: 8,
            id: "q8",
            type: "single",
            title: "08. Como você imagina seu futuro profissional?",
            options: [
                {
                    id: "q8a",
                    value: "trabalhar_tech",
                    label: "Trabalhando com tecnologia e inovação",
                    scores: { agrotech: 1, agroprod: 0, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q8b",
                    value: "desenvolver_pesquisas",
                    label: "Desenvolvendo pesquisas e descobertas",
                    scores: { agrotech: 0, agroprod: 0, agroeco: 0, agrolab: 1 }
                },
                {
                    id: "q8c",
                    value: "atuar_campo",
                    label: "Atuando diretamente no campo",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                },
                {
                    id: "q8d",
                    value: "liderar_projetos",
                    label: "Liderando projetos e negócios do agro",
                    scores: { agrotech: 0, agroprod: 1, agroeco: 0, agrolab: 0 }
                }
            ]
        }
    ],

    // =========================================================================
    // QUIZ 3: GESTÃO EMPRESARIAL — 10 PERGUNTAS
    // Classes: lideranca, financas, marketing, operacoes
    // =========================================================================
    gestao: [
        {
            step: 1,
            id: "q1",
            type: "single",
            title: "01. Em um trabalho em grupo ou projeto, qual papel você costuma assumir naturalmente?",
            options: [
                {
                    id: "q1a",
                    value: "comunicador",
                    label: "Organizo as pessoas, apresento as ideias e mantenho o grupo unido",
                    scores: { lideranca: 5, financas: 1, marketing: 4, operacoes: 2 }
                },
                {
                    id: "q1b",
                    value: "planejador",
                    label: "Cuido do planejamento, dos números, prazos e de fazer tudo funcionar",
                    scores: { lideranca: 2, financas: 5, marketing: 2, operacoes: 5 }
                }
            ]
        },
        {
            step: 2,
            id: "q2",
            type: "multiple",
            title: "02. Quando você conhece uma empresa de sucesso, o que mais chama sua atenção?",
            hint: "Você pode selecionar mais de uma alternativa",
            options: [
                {
                    id: "q2a",
                    value: "cultura_equipe",
                    label: "O clima da equipe, a liderança e como as pessoas são valorizadas",
                    scores: { lideranca: 5, financas: 2, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q2b",
                    value: "lucro_investimento",
                    label: "O faturamento, os investimentos e a inteligência financeira",
                    scores: { lideranca: 2, financas: 5, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q2c",
                    value: "marca_propaganda",
                    label: "A força da marca, as campanhas criativas e o sucesso de vendas",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q2d",
                    value: "logistica_rapida",
                    label: "A rapidez na entrega, a organização e os processos sem falhas",
                    scores: { lideranca: 2, financas: 3, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 3,
            id: "q3",
            type: "single",
            title: "03. Se você fosse abrir um negócio próprio hoje, qual seria seu foco principal?",
            options: [
                {
                    id: "q3a",
                    value: "montar_time",
                    label: "Reunir um time talentoso e motivado para crescer junto comigo",
                    scores: { lideranca: 5, financas: 2, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q3b",
                    value: "controle_caixa",
                    label: "Calcular custos, margem de lucro e garantir que a conta feche no azul",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 3 }
                },
                {
                    id: "q3c",
                    value: "atrair_clientes",
                    label: "Criar um produto inovador e divulgar nas redes para atrair clientes",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q3d",
                    value: "estruturar_operacao",
                    label: "Organizar fornecedores, estoque e entregas para tudo rodar perfeitamente",
                    scores: { lideranca: 2, financas: 3, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 4,
            id: "q4",
            type: "single",
            title: "04. Quando surge um problema inesperado em um projeto, qual é a sua primeira atitude?",
            options: [
                {
                    id: "q4a",
                    value: "conversar_equipe",
                    label: "Converso com os envolvidos para alinhar a equipe e resolver juntos",
                    scores: { lideranca: 5, financas: 1, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q4b",
                    value: "avaliar_impacto",
                    label: "Analiso os números e o impacto no orçamento antes de decidir",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 3 }
                },
                {
                    id: "q4c",
                    value: "reorganizar_fluxo",
                    label: "Refaço o cronograma e ajusto o passo a passo para não atrasar a entrega",
                    scores: { lideranca: 2, financas: 2, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 5,
            id: "q5",
            type: "single",
            title: "05. Você gosta de observar por que certos produtos viralizam e conquistam tantos consumidores?",
            options: [
                {
                    id: "q5a",
                    value: "sim_comportamento",
                    label: "Sim! Acho fascinante entender o comportamento do consumidor e tendências",
                    scores: { lideranca: 3, financas: 1, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q5b",
                    value: "prefiro_gestao_interna",
                    label: "Acho legal, mas prefiro cuidar da organização interna ou das finanças",
                    scores: { lideranca: 2, financas: 5, marketing: 1, operacoes: 5 }
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
                    value: "inspirar",
                    label: "Gosto de ouvir, apoiar e desenvolver o potencial das pessoas",
                    scores: { lideranca: 5, financas: 1, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q6b",
                    value: "analisar",
                    label: "Gosto de planejar meus gastos, metas e tomar decisões seguras",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 3 }
                },
                {
                    id: "q6c",
                    value: "convencer",
                    label: "Gosto de ter ideias criativas, negociar e convencer pessoas",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q6d",
                    value: "otimizar",
                    label: "Gosto de colocar ordem na bagunça e tornar tudo mais prático e rápido",
                    scores: { lideranca: 2, financas: 3, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 7,
            id: "q7",
            type: "single",
            title: "07. Se pudesse escolher um tema de Gestão Empresarial para dominar agora, qual seria?",
            options: [
                {
                    id: "q7a",
                    value: "rh_lideranca",
                    label: "Liderança de Equipes, Gestão de Talentos e Comunicação",
                    scores: { lideranca: 5, financas: 1, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q7b",
                    value: "investimentos",
                    label: "Finanças Corporativas, Investimentos e Economia",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 2 }
                },
                {
                    id: "q7c",
                    value: "estrategia_mkt",
                    label: "Marketing Digital, Vendas, Inovação e Empreendedorismo",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q7d",
                    value: "logistica_projetos",
                    label: "Logística, Gestão de Projetos e Qualidade Operacional",
                    scores: { lideranca: 2, financas: 2, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 8,
            id: "q8",
            type: "single",
            title: "08. Qual ambiente de trabalho mais combina com o seu estilo?",
            options: [
                {
                    id: "q8a",
                    value: "dinamico_pessoas",
                    label: "Em contato constante com pessoas, reuniões, treinamentos e parcerias",
                    scores: { lideranca: 5, financas: 1, marketing: 4, operacoes: 2 }
                },
                {
                    id: "q8b",
                    value: "estrategico_dados",
                    label: "Analisando indicadores, relatórios financeiros e metas estratégicas",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 4 }
                },
                {
                    id: "q8c",
                    value: "criativo_mercado",
                    label: "Criando campanhas, novos produtos e estratégias para conquistar clientes",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                }
            ]
        },
        {
            step: 9,
            id: "q9",
            type: "single",
            title: "09. Qual dessas áreas da Gestão mais desperta sua curiosidade?",
            options: [
                {
                    id: "q9a",
                    value: "lideranca",
                    label: "Gestão de Pessoas e Liderança (RH & Cultura)",
                    scores: { lideranca: 5, financas: 1, marketing: 2, operacoes: 2 }
                },
                {
                    id: "q9b",
                    value: "financas",
                    label: "Gestão Financeira e Controladoria (Finanças)",
                    scores: { lideranca: 1, financas: 5, marketing: 1, operacoes: 2 }
                },
                {
                    id: "q9c",
                    value: "marketing",
                    label: "Marketing, Negócios e Inovação (Comercial)",
                    scores: { lideranca: 2, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q9d",
                    value: "operacoes",
                    label: "Logística, Processos e Produção (Operações)",
                    scores: { lideranca: 2, financas: 2, marketing: 1, operacoes: 5 }
                }
            ]
        },
        {
            step: 10,
            id: "q10",
            type: "single",
            title: "10. O que mais te motiva ao pensar no seu futuro profissional?",
            options: [
                {
                    id: "q10a",
                    value: "liderar_time",
                    label: "Ser um líder admirado que inspira e transforma equipes",
                    scores: { lideranca: 5, financas: 2, marketing: 3, operacoes: 2 }
                },
                {
                    id: "q10b",
                    value: "solidez_financeira",
                    label: "Dominar o mundo das finanças e multiplicar resultados",
                    scores: { lideranca: 1, financas: 5, marketing: 2, operacoes: 2 }
                },
                {
                    id: "q10c",
                    value: "criar_marcas",
                    label: "Lançar ideias, marcas e negócios que conquistem o mercado",
                    scores: { lideranca: 3, financas: 2, marketing: 5, operacoes: 1 }
                },
                {
                    id: "q10d",
                    value: "eficiencia_total",
                    label: "Fazer grandes projetos e operações funcionarem com perfeição",
                    scores: { lideranca: 2, financas: 3, marketing: 1, operacoes: 5 }
                }
            ]
        }
    ]
});

// Mantém exportação compatível caso algum módulo referencie QUIZ_QUESTIONS diretamente
export const QUIZ_QUESTIONS = QUIZ_QUESTIONS_BY_TRACK.ti;


