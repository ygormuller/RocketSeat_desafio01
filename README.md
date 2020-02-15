# RocketSeat_desafio01

Aplicação para armazenar projetos e suas tarefas do zero utilizando Express.

# Rotas:

- POST /projects: A rota receber id e title dentro do corpo e cadastra um novo projeto dentro de um array no seguinte formato: 
{ id: "1", title: 'Novo projeto', tasks: [] }; 
Enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

- GET /projects: Rota lista todos projetos e tarefas;

- PUT /projects/:id : A rota alterar apenas o título do projeto com o id presente nos parâmetros da rota;

- DELETE /projects/:id : A rota deleta o projeto com o id presente nos parâmetros da rota;

- POST /projects/:id/tasks: A rota recebe um campo title e armazenar uma nova tarefa no array de tarefas de um projeto
específico escolhido através do id presente nos parâmetros da rota;

# Exemplo
Se chamar a rota POST /projects repassando { id: 1, title: 'Novo projeto' } e a rota POST /projects/1/tasks com
{ title: 'Nova tarefa' }, o array de projetos fica assim:

[
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

# Middlewares:

- Middleware criado que é utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto 
com aquele ID existe. Se não existir retorna um erro, caso contrário permita a requisição continuar normalmente;

- Middleware global criado chamado em todas requisições que imprime (console.log) uma contagem de quantas requisições foram 
feitas na aplicação até então;
