const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

let tasks = [];
let completedTasks = [];

//  Home page
app.get("/", (req, res) => {
  res.render("home");
});

//  Today's tasks
app.get("/todayTask", (req, res) => {
  res.render("tasks", { tasks, completedTasks });
});

// Add a new task
app.post("/add-task", (req, res) => {
  const { title, description } = req.body;
  if (title.trim() === "" || description.trim() === "") {
    return res.redirect("/");
  }
  tasks.push({ id: Date.now(), title, description });
  res.redirect("/todayTask");
});

// Complete a task
app.post("/complete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    completedTasks.push(tasks.splice(taskIndex, 1)[0]);
  }
  res.redirect("/todayTask");
});

// Delete a task
app.post("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  completedTasks = completedTasks.filter((task) => task.id !== taskId);
  res.redirect("/todayTask");
});

// Edit a task
app.get("/edit-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).send("<h1>Task not found</h1>");
  }

  res.render("edit", { task });
});

// Update task details
app.post("/update-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send("<h1>Task not found</h1>");
  }

  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  res.redirect("/todayTask");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
