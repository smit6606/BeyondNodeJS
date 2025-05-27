const express = require("express");

const route = express.Router();

console.log("Routing");

const postCTR = require("../controllers/postController");

route.get("/", postCTR.postPage);
route.get("/about", postCTR.aboutPage);
route.get("/contact", postCTR.contactPage);

route.use("/employee", require("../routes/employee"));

module.exports = route;
