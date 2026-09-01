const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awesomeFunction);
routes.get("/ttech", myController.tooeleTech);

routes.use("/students", require("../routes/students"));

module.exports = routes;
