const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

//Middleware global para contagem de requisições
server.use((req, res, next) => {
  
  console.count("Number of requests");
  
  return next();
})

//Middleware para verificar id de projetos

function idCheckExists (req, res, next) {
  const { id } = req.params;
  const checkId = projects.find(proj=>proj.id == id);
  if(!checkId){
    return res.status(400).json({error: 'id not exists'});
  }
  req.checkId = checkId;
  return next();
 };


//Todos os projetos criados
server.get('/projects', (req, res) =>{
  return res.json(projects);
})

//Buscando projeto pelo id
server.get ('/projects/:id', (req, res)=> {
  const { id } = req.params;
  return res.json(projects[id]);
})

//Criando projeto
server.post ('/projects', (req, res)=> {
  const { id, title, task } = req.body;
  const project = {id, title, task:[]};
  projects.push(project);
  return res.json(projects);
})

//Criando tarefa
server.post('/projects/:id/task', idCheckExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  //const { task } = req.boby;

  const project = projects.find(proj => proj.id == id);

  project.task.push(title);

  return res.json(project);
});

//Editando titulo do projeto
server.put('/projects/:id', idCheckExists, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  const checkId = projects.find(proj=>proj.id == id);
  checkId.title = title;
  return res.json(projects);  
})
//Editando tarefa
server.put('/projects/:id/task', idCheckExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Deletar projeto
server.delete('/projects/:id', (req, res)=>{
  const { id } = req.params;
  projects.splice(id, 1);
  //return res.json(projects);//retona a lista
  return res.send();//não retorna lista
});

server.listen(3000);
