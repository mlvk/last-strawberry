import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('route-visit', {
  default: {
    fulfillments: FactoryGuy.hasMany('fulfillment'),
    address: FactoryGuy.belongsTo('address')
  },

  traits: {
    with_route_plan: {
      routePlan: FactoryGuy.belongsTo('route-plan')
    }
  }
});
