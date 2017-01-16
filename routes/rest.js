/*
  Settings of Rest API endpoints
  
  Using:
  https://github.com/gagky/restful-keystone-plus

*/

const keystone = require('keystone');
const middleware = require('./middleware');

const restful = require('restful-keystone')(keystone, {
  root: process.env.API_BASE || '/api/v1'
});

// Standard defaut config for retrievals
const defaultConfig = {
  sort: { sortOrder: 1 },
  envelop: 'results',
  methods: ['list', 'retrieve']
};

const readOnlyConfig = {
  create: false,
  list: true,
  retrieve: true,
  update: false,
  remove: false,
}

module.exports = () => {
  restful.expose({
    Premise: Object.assign({}, defaultConfig, {
      filter: (req) => (
        req.user.isAdmin ? {} : { admins: req.user._id }
      ) 
    }),
    CarMaker: defaultConfig,
    CarModel: defaultConfig,
  }).before({
  }).after({
  }).start();
};
