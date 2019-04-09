'use strict';

let machine = require("../../server")
// import { machine } from '../../server'
exports.list_all_tasks = function(req, res) {
    res.json(req);
};


exports.get_status = function(req, res) {
  // console.log(machine.machine)
  if (req.params.id in machine.machine) {
    res.json(machine.machine[req.params.id])
  } else {
    res.send('not found')
  }
};


exports.get_all_status = function(req, res) {
  // console.log(machine.machine)
  res.json(machine.machine)
};
