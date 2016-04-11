import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('route-visit', {
  default: {
    fulfillments: FactoryGuy.hasMany('fulfillment'),
    visitWindow: FactoryGuy.belongsTo('visit-window')
  }
});
