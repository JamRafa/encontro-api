const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser); // Permite analisar solicitações POST com JSON no corpo

// Rota GET personalizada para listar itens
server.get("/inscritos", (req, res) => {
  const inscritos = router.db.get("inscritos").value();
  res.json(inscritos);
});

// Rota POST personalizada para criar um novo item
server.post("/inscritos", (req, res) => {
  const newItem = req.body; // O corpo da solicitação deve conter o novo item
  router.db.get("inscritos").push(newItem).write();
  res.json(newItem);
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});
