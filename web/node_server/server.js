var express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require("./api/routes/routes.js"); //importing route
routes(app); //register the route


app.listen(port);


console.log("todo list RESTful API server started on: " + port);
let machine = {
  1: 7261,
  2: 1,
}

const live = () => {
  machine["1"] = machine["1"]+1
  machine["2"] = machine["2"]+1
}
setInterval(live, 1000)

module.exports.machine = machine