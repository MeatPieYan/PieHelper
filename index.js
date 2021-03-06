const PieComponent = require('./dist/PieComponent');
const pieConnect = require('./dist/pieConnect');
const phoenixConnect = require('./dist/phoenixConnect');
const pieAction = require('./dist/pie/pieAction');
const pieReducer = require('./dist/pie/pieReducer');

module.exports = {
  PieComponent: PieComponent,
  pieConnect: pieConnect,
  pieReducer: pieReducer,
  pieAction: pieAction,
  phoenixConnect: phoenixConnect
};
