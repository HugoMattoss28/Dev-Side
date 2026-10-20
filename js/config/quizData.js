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
    // QUIZ 1: TECNOLOGIA DA INFORMAÇÃO (TI) — 10 PERGUNTAS
    // =========================================================================
    ti: [
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
    ],

    // =========================================================================
    // QUIZ 2: AGRONEGÓCIO / ENGENHARIA AGRONÔMICA — 10 PERGUNTAS
    // Classes: agrotech, agroprod, agroeco, agrolab
    // =========================================================================
    agro: [
        {
            step: 1,
            id: "q1",
            type: "single",
            title: "01. Onde você se imagina trabalhando com mais entusiasmo?",
            options: [
                {
                    id: "q1a",
                    value: "campo_aberto",
                    label: "Ao ar livre, acompanhando plantações e colheitas de perto",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 4, agrolab: 1 }
                },
                {
                    id: "q1b",
                    value: "tecnologia_lab",
                    label: "Operando tecnologias avançadas, drones ou realizando análises em laboratório",
                    scores: { agrotech: 5, agroprod: 2, agroeco: 2, agrolab: 5 }
                }
            ]
        },
        {
            step: 2,
            id: "q2",
            type: "multiple",
            title: "02. Quando você pensa no futuro do Agronegócio, o que mais chama sua atenção?",
            hint: "Você pode selecionar mais de uma alternativa",
            options: [
                {
                    id: "q2a",
                    value: "drones_sensores",
                    label: "Drones, tratores autônomos, sensores e satélites no campo",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 2, agrolab: 2 }
                },
                {
                    id: "q2b",
                    value: "alta_producao",
                    label: "Produzir mais alimentos com qualidade para abastecer o mundo",
                    scores: { agrotech: 3, agroprod: 5, agroeco: 3, agrolab: 2 }
                },
                {
                    id: "q2c",
                    value: "sustentabilidade",
                    label: "Preservar a água, recuperar o solo e produzir sem agredir a natureza",
                    scores: { agrotech: 2, agroprod: 3, agroeco: 5, agrolab: 3 }
                },
                {
                    id: "q2d",
                    value: "genetica_pesquisa",
                    label: "Descobrir novas sementes, fertilizantes e soluções científicas",
                    scores: { agrotech: 3, agroprod: 2, agroeco: 2, agrolab: 5 }
                }
            ]
        },
        {
            step: 3,
            id: "q3",
            type: "single",
            title: "03. Qual desses desafios no campo parece ser mais interessante para você?",
            options: [
                {
                    id: "q3a",
                    value: "automatizar",
                    label: "Automatizar a irrigação usando sensores inteligentes e aplicativos",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 3, agrolab: 2 }
                },
                {
                    id: "q3b",
                    value: "cultivar",
                    label: "Planejar o plantio do início ao fim para alcançar uma safra recorde",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 2, agrolab: 2 }
                },
                {
                    id: "q3c",
                    value: "reflorestamento",
                    label: "Recuperar uma área degradada e proteger nascentes de água",
                    scores: { agrotech: 1, agroprod: 2, agroeco: 5, agrolab: 2 }
                },
                {
                    id: "q3d",
                    value: "pragas_lab",
                    label: "Investigar no microscópio como combater uma praga agrícola",
                    scores: { agrotech: 2, agroprod: 2, agroeco: 2, agrolab: 5 }
                }
            ]
        },
        {
            step: 4,
            id: "q4",
            type: "single",
            title: "04. Se uma plantação não está crescendo como deveria, qual é a sua primeira reação?",
            options: [
                {
                    id: "q4a",
                    value: "dados_clima",
                    label: "Olhar os mapas de satélite, sensores de umidade e dados climáticos",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 2, agrolab: 3 }
                },
                {
                    id: "q4b",
                    value: "ir_lavoura",
                    label: "Ir direto até a lavoura observar as plantas e o manejo prático",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 3, agrolab: 2 }
                },
                {
                    id: "q4c",
                    value: "coletar_solo",
                    label: "Coletar amostras do solo e das folhas para fazer testes e análises",
                    scores: { agrotech: 2, agroprod: 2, agroeco: 3, agrolab: 5 }
                }
            ]
        },
        {
            step: 5,
            id: "q5",
            type: "single",
            title: "05. Você acha incrível como é possível produzir alimentos e ao mesmo tempo regenerar o meio ambiente?",
            options: [
                {
                    id: "q5a",
                    value: "muito_importante",
                    label: "Sim! Equilibrar produção e natureza é a missão mais importante",
                    scores: { agrotech: 2, agroprod: 3, agroeco: 5, agrolab: 3 }
                },
                {
                    id: "q5b",
                    value: "foco_eficiencia",
                    label: "Acho importante, mas meu foco principal é na tecnologia e produtividade",
                    scores: { agrotech: 5, agroprod: 4, agroeco: 1, agrolab: 3 }
                }
            ]
        },
        {
            step: 6,
            id: "q6",
            type: "single",
            title: "06. Qual dessas frases mais combina com o seu perfil?",
            options: [
                {
                    id: "q6a",
                    value: "inovar",
                    label: "Gosto de testar novas tecnologias e modernizar processos",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 2, agrolab: 3 }
                },
                {
                    id: "q6b",
                    value: "praticar",
                    label: "Gosto de atividades práticas e de ver o resultado do meu trabalho crescendo",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 3, agrolab: 1 }
                },
                {
                    id: "q6c",
                    value: "proteger",
                    label: "Gosto de cuidar da natureza e pensar no impacto ambiental",
                    scores: { agrotech: 2, agroprod: 2, agroeco: 5, agrolab: 2 }
                },
                {
                    id: "q6d",
                    value: "pesquisar",
                    label: "Gosto de fazer experimentos, pesquisar e descobrir o porquê das coisas",
                    scores: { agrotech: 3, agroprod: 1, agroeco: 2, agrolab: 5 }
                }
            ]
        },
        {
            step: 7,
            id: "q7",
            type: "single",
            title: "07. Se você pudesse escolher uma aula prática agora na Fatec/Etec, qual seria?",
            options: [
                {
                    id: "q7a",
                    value: "pilotar_drone",
                    label: "Mapeamento de fazendas com drones e agricultura de precisão",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 2, agrolab: 2 }
                },
                {
                    id: "q7b",
                    value: "manejo_culturas",
                    label: "Cultivo prático, nutrição de plantas e gestão de produção no campo",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 3, agrolab: 2 }
                },
                {
                    id: "q7c",
                    value: "agrofloresta",
                    label: "Conservação do solo, recursos hídricos e sistemas agroflorestais",
                    scores: { agrotech: 2, agroprod: 3, agroeco: 5, agrolab: 2 }
                },
                {
                    id: "q7d",
                    value: "biotecnologia",
                    label: "Laboratório de análise de sementes, solos e controle biológico",
                    scores: { agrotech: 2, agroprod: 2, agroeco: 3, agrolab: 5 }
                }
            ]
        },
        {
            step: 8,
            id: "q8",
            type: "single",
            title: "08. Como você prefere atuar em um projeto agrícola?",
            options: [
                {
                    id: "q8a",
                    value: "analise_sistemas",
                    label: "Monitorando indicadores digitais e automatizando equipamentos",
                    scores: { agrotech: 5, agroprod: 2, agroeco: 2, agrolab: 3 }
                },
                {
                    id: "q8b",
                    value: "liderando_campo",
                    label: "Em movimento no campo, coordenando o plantio e a colheita",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 3, agrolab: 1 }
                },
                {
                    id: "q8c",
                    value: "investigando",
                    label: "Concentrado em testes, análises de qualidade e sustentabilidade",
                    scores: { agrotech: 2, agroprod: 1, agroeco: 4, agrolab: 5 }
                }
            ]
        },
        {
            step: 9,
            id: "q9",
            type: "single",
            title: "09. Qual dessas áreas do Agro mais desperta sua curiosidade?",
            options: [
                {
                    id: "q9a",
                    value: "agrotech",
                    label: "Agricultura Digital, Drones e Automação (AgroTech)",
                    scores: { agrotech: 5, agroprod: 2, agroeco: 1, agrolab: 2 }
                },
                {
                    id: "q9b",
                    value: "agroprod",
                    label: "Produção Vegetal, Cultivos e Gestão de Fazendas (AgroProd)",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 2, agrolab: 1 }
                },
                {
                    id: "q9c",
                    value: "agroeco",
                    label: "Sustentabilidade, Solo e Meio Ambiente (AgroEco)",
                    scores: { agrotech: 1, agroprod: 2, agroeco: 5, agrolab: 2 }
                },
                {
                    id: "q9d",
                    value: "agrolab",
                    label: "Pesquisa Científica, Genética e Análises (AgroLab)",
                    scores: { agrotech: 2, agroprod: 1, agroeco: 2, agrolab: 5 }
                }
            ]
        },
        {
            step: 10,
            id: "q10",
            type: "single",
            title: "10. O que mais te motiva ao pensar em uma carreira no Agronegócio?",
            options: [
                {
                    id: "q10a",
                    value: "revolucionar",
                    label: "Levar alta tecnologia para revolucionar o trabalho no campo",
                    scores: { agrotech: 5, agroprod: 3, agroeco: 2, agrolab: 2 }
                },
                {
                    id: "q10b",
                    value: "alimentar",
                    label: "Participar da produção dos alimentos que chegam à mesa das pessoas",
                    scores: { agrotech: 2, agroprod: 5, agroeco: 3, agrolab: 2 }
                },
                {
                    id: "q10c",
                    value: "planeta",
                    label: "Garantir que o campo produza respeitando o planeta e as próximas gerações",
                    scores: { agrotech: 2, agroprod: 2, agroeco: 5, agrolab: 2 }
                },
                {
                    id: "q10d",
                    value: "ciencia",
                    label: "Desenvolver novas soluções científicas para superar pragas e mudanças climáticas",
                    scores: { agrotech: 3, agroprod: 2, agroeco: 3, agrolab: 5 }
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


