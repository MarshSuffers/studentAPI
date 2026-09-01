const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awesomeFunction);
routes.get("/ttech", myController.tooeleTech);

routes.use("/colors", require("../routes/colors"));
routes.use("/students", require("../routes/students"));
routes.use("/auth", require("../routes/auth"));

module.exports = routes;
