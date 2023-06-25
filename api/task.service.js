const DB = require("./data");
const Tasks = DB.Tasks;

class TaskService {
  static list(req, res) {
    res.send(Tasks);
  }
  static create(req, res) {
    const task = {
      ...req.body,
      id: `tk_${Date.now()}`,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    Tasks.unshift(task);
    res.status(201).json(task);
  }
  static find(req, res) {
    const task = Tasks.find((u) => u.id === req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(task);
  }

  static findWithExpenses(req, res) {
    // const user = Users.find((u) => u.id === req.params.id);
    // if (!user) {
    //   return res.status(404).json({ message: "Usuário não encontrado" });
    // }
    // user._expenses = getExpensesByUser(user);
    // res.json(user);
  }

  static update(req, res) {
    const taskIndex = Tasks.findIndex((u) => u.id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    if (req.body.id) {
      return res
        .status(400)
        .json({ message: "Id nao pode ser passado no corpo da funcao" });
    }
    const { id, created_at } = Tasks[taskIndex];
    const task = {
      ...Tasks[taskIndex],
      ...req.body,
      id,
      created_at,
      updated_at: Date.now(),
    };
    Tasks[taskIndex] = task;
    res.json(task);
  }
  static delete(req, res) {
    const taskIndex = Tasks.findIndex((u) => u.id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    Tasks.splice(taskIndex, 1);
    res.status(204).send();
  }
}

module.exports = TaskService;
