const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const TaskService = require("./task.service");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Mach project");
});

// USERS ====================================================================
app.get("/task", TaskService.list);
app.post("/task", TaskService.create);
app.get("/task/:id", TaskService.find);
app.put("/task/:id", TaskService.update);
app.delete("/task/:id", TaskService.delete);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
