const express = require("express");
const app = express();
const port = 8080;

let detailStudents = [
  {
    name: "Smit",
    age: 24,
    email: "smeetgarala6606@gmail.com",
    phone: "8320436638",
    password: "Smit@1234",
    college: "Ck Pithawala College of Engineering and Technology",
  },
  {
    name: "Jeet",
    age: 28,
    email: "jeetgarala1122@gmail.com",
    phone: "7405807062",
    password: "Jeet@2345",
    college: "Navyug College",
  },
  {
    name: "Krishna",
    age: 25,
    email: "krishnagarala07@gmail.com",
    phone: "9537964696",
    password: "Krishna@3456",
    college: "Kp Commerce College",
  },
  {
    name: "Vaishali",
    age: 50,
    email: "vaishaligarala9510@gmail.com",
    phone: "9510219861",
    password: "Vaishali@4567",
    college: "Veer Narmad University",
  },
  {
    name: "Uttam",
    age: 54,
    email: "uttamgarala@gmail.com",
    phone: "9722158454",
    password: "Uttam@5678",
    college: "Gujarat Technical University",
  },
];

app.set("view engine", "ejs");

// Home Page
app.get("/", (req, res) => {
  res.render("index", { detailStudents });
});

// Student Page
app.get("/student", (req, res) => {
  res.render("student", { detailStudents });
  res.end(err, () => {
    console.log(error);
  });
});

// Contact Page
app.get("/contact", (req, res) => {
  res.render("contact", { detailStudents });
});

// About Page
app.get("/about", (req, res) => {
  res.render("about");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is Started on http://localhost:${port} 😉`);
});
