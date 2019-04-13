var express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  bodyParser = require("body-parser");

var cors = require('cors');


const {JWT} = require('google-auth-library');
const keys = require('./jwt.key.json');

async function check() {
  const client = new JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/cloud-platform'],
  );
  const url = `https://www.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({url});
  console.log(res.data);
}

check().catch(console.error);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


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