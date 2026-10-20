Diretrizes de Desenvolvimento e Refatoração (Antigravity Rules)

📌 Contexto

Este projeto é um fork de uma base de código legada que possui problemas de estruturação, lógica e design.
A nossa missão é refatorar completamente o código, utilizando exclusivamente HTML, CSS e JavaScript puros, com foco em entregar uma experiência de usuário (UX) premium através de animações profissionais e performáticas.

Não devemos "remendar" o código quebrado. A lógica confusa deve ser reescrita do zero seguindo as melhores práticas.

🛠️ Regras de JavaScript Vanilla (Clean Code & DOM)

Modernização (ES6+): Utilize sintaxe moderna. Prefira const e let, Arrow Functions, Destructuring e Template Literals. Nunca use var.

Manipulação do DOM Otimizada: Evite manipular o DOM excessivamente dentro de loops. Faça as alterações em memória (ex: DocumentFragment) e insira no DOM de uma vez só para evitar múltiplos reflows e repaints.

Modularidade: Separe a lógica em arquivos .js distintos (ex: módulo para animações, módulo para requisições, módulo para UI) e importe-os via <script type="module">.

Clean Code: Nomenclatura explícita em inglês (ex: toggleMobileMenu()), funções puras quando possível e tratamento rigoroso de erros (try/catch).

🎨 Regras de HTML e CSS

HTML Semântico: Utilize tags corretas (<main>, <header>, <article>, <dialog>) para garantir acessibilidade (a11y) e excelente SEO.

Arquitetura CSS Limpa: Como não usaremos frameworks, mantenha o CSS organizado. Use variáveis nativas do CSS (:root) para cores, espaçamentos e fontes. Adote uma metodologia de nomenclatura (como BEM) para evitar conflitos de classes.

Responsividade Garantida: O layout deve usar abordagem Mobile-First, com Media Queries precisas para adaptar a interface até telas Ultrawide.

✨ Regras para Animações Profissionais (CRÍTICO)

Alta Performance (60fps+): Para garantir fluidez absoluta, anime apenas as propriedades transform (translate, scale, rotate) e opacity. NUNCA anime propriedades que causam reflow de layout, como width, height, margin, padding ou top/left.

CSS vs JS:

Use CSS Transitions e Keyframes para micro-interações simples (hover em botões, aberturas de menus simples).

Use a Web Animations API nativa do JS ou requestAnimationFrame para sequências complexas, animações atreladas ao scroll da página ou físicas interativas.

Curvas de Aceleração (Easing) Premium: Abandone o ease ou linear padrão. Utilize curvas cubic-bezier() customizadas para dar um aspecto mais natural, sofisticado e "físico" às animações (ex: uma desaceleração suave ao final do movimento).

Acessibilidade de Animação: Sempre respeite as preferências do usuário. Envolva animações CSS pesadas em uma media query @media (prefers-reduced-motion: no-preference) ou verifique isso via JS (window.matchMedia).

Coreografia Visual: Elementos não devem aparecer todos de uma vez. Utilize staggering (atrasos em cascata) para animar listas ou grupos de elementos de forma sequencial e elegante.

🤖 Comportamento da IA (Antigravity)

Identifique a intenção, não a implementação ruim: Analise o que o código antigo tentava fazer visualmente/logicamente e sugira a abordagem moderna e limpa.

Foque na Fluidez: Toda vez que for gerar um novo componente visual, inclua ou sugira as classes/lógicas para uma entrada e saída animada elegante.

Pense na Arquitetura: Antes de gerar muito código JS, explique a estrutura mental da solução (ex: "Vou criar um Intersection Observer para as animações de scroll").