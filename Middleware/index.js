const express = require("express");
const app = express();
const port = 8000;

app.use(express.static("public"));

app.set("view engine", "ejs");

const mathVerification = (req, res, next) => {
  const num1 = 3;
  const num2 = 7;
  const correctAnswer = num1 + num2;

  const userAnswer = req.query.answer;
  console.log(`User Answer: ${userAnswer}`);
  console.log(`Correct Answer: ${correctAnswer}`);

  if (userAnswer && parseInt(userAnswer) === correctAnswer) {
    return res.redirect("/home");
  } else {
    res.render("math-verification", {
      num1: num1,
      num2: num2,
      error: userAnswer ? "Wrong answer! Try again." : "",
    });
  }
};

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/", mathVerification);

app.get("/user", (req, res) => {
  res.render("user");
});

app.listen(port, () => {
  console.log(`The Server is started on port ${port}....`);
});
