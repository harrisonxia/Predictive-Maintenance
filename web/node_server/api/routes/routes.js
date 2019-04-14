'use strict';
module.exports = function(app) {
  let list = require('../controllers/controller.js');

  app.route('/machines')
    .get(list.get_all_status)


  app.route('/machines/:id')
    .get(list.get_status)

};
