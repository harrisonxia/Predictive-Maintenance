'use strict';
module.exports = function(app) {
  let list = require('../controllers/controller.js');

  // todoList Routes
  app.route('/machines')
    .get(list.get_all_status)
    // .post(list.create_a_task);


  app.route('/machines/:id')
    .get(list.get_status)
    // .put(list.update_a_task)
    // .delete(todoList.delete_a_task);
};
