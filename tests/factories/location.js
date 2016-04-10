import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('location', {
  default: {
    address: FactoryGuy.belongsTo('address'),
    visitWindows: FactoryGuy.hasMany('visit-window', 1)
  }
});
