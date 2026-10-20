🛡️ Diretrizes de Segurança e Boas Práticas (Security Rules)

📌 Contexto de Segurança

Este projeto é uma aplicação Front-end (HTML, CSS, JS puro) hospedada na Vercel, que se conectará a um Banco de Dados (Supabase ou Neon/Serverless) para salvar o resultado de quizzes de alunos.
O público-alvo são estudantes de tecnologia, portanto, a aplicação é alvo provável de tentativas de manipulação via Client-side (DevTools, F12, injeção de scripts). A segurança não é opcional, é a prioridade.

1. 🛑 Gestão de Segredos e Chaves (Keys & Secrets)

NUNCA exponha senhas de banco de dados, strings de conexão (PostgreSQL) ou chaves secretas (ex: service_role_key do Supabase) no código JavaScript do Front-end.

Uso Permitido no Client-side: Apenas chaves públicas feitas para o Front-end (ex: anon_key do Supabase) podem ficar no JS, e apenas se o banco de dados estiver protegido por RLS (Row Level Security).

Serverless Functions: Qualquer lógica que exija conexão direta com o banco (como Neon) ou chaves secretas DEVE ser feita exclusivamente através de Vercel Serverless Functions (arquivos dentro da pasta /api/). O Front-end deve apenas fazer um fetch() para essas rotas internas.

2. 💉 Prevenção contra Injeções (XSS e SQLi)

Sanitização Rigorosa: Todo input do usuário (nome, apelido, email) deve ser higienizado antes de ser exibido na tela (para evitar XSS - Cross-Site Scripting) e antes de ser enviado ao banco.

Uso de textContent: Ao manipular o DOM para exibir dados inseridos pelo usuário, use SEMPRE element.textContent em vez de element.innerHTML. NUNCA confie na entrada do usuário.

Queries Parametrizadas: Ao interagir com o banco de dados via Serverless Functions, sempre utilize queries parametrizadas ou métodos seguros de SDKs para evitar SQL Injection.

3. 🛡️ Controle de Acesso e CORS

CORS (Cross-Origin Resource Sharing): Se criarmos rotas de API na Vercel, configure os cabeçalhos CORS para aceitar requisições APENAS do nosso domínio oficial (devside-psi.vercel.app) e do localhost (para desenvolvimento). Bloqueie o resto.

RLS (Row Level Security): Se o Supabase for escolhido, a IA deve sempre incluir as instruções SQL de RLS garantindo que usuários anônimos possam apenas INSERIR (INSERT) novos resultados de quiz, mas nunca LER (SELECT), ATUALIZAR ou DELETAR os resultados de outros alunos.

4. 🚦 Rate Limiting e Validação Anti-Spam

Debounce/Throttle: Implemente bloqueios no botão de "Finalizar/Salvar" do front-end para impedir que um aluno clique 50 vezes seguidas e floode o banco de dados.

Validação de Payload: A API/Banco só deve aceitar dados que correspondam exatamente à estrutura esperada. Se o quiz vai de 0 a 100 pontos, o backend DEVE recusar qualquer envio com "9999 pontos". Não confie na validação apenas do JavaScript do Front-end.