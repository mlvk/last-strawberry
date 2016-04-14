import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('item-credit-rate', {
  default: {
    rate: 0,
    order: FactoryGuy.belongsTo('item'),
    location: FactoryGuy.belongsTo('location')
  }
});
