const express = require("express");
const bodyParser = require("body-parser");
const { User } = require('./app/models');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users", async (req, res) => {
  const user = await User.findAll();
  res.json(user)
});
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user)
});
app.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  user.update(req.body)
  res.json(user)
});
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  user.destroy()
    .then(res.json({message: "user deleted: "}))
});
app.listen(3000);
