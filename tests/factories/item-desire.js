import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('item-desire', {
  default: {
    enabled: false,
    order: FactoryGuy.belongsTo('item'),
    location: FactoryGuy.belongsTo('location')
  }
});
