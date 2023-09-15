const jsonServer = require("json-server");
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

module.exports = async (req, res) => {
  // Adicione o código do servidor aqui
  const app = jsonServer.create();
  app.use(middlewares);
  app.use(jsonServer.bodyParser);

  // Rota GET personalizada para listar itens
  app.get("/inscritos", (req, res) => {
    const inscritos = router.db.get("inscritos").value();
    res.json(inscritos);
  });

  // Rota POST personalizada para criar um novo item
  app.post("/inscritos", (req, res) => {
    const newItem = req.body;
    router.db.get("inscritos").push(newItem).write();
    res.json(newItem);
  });

  await app(req, res);
};
