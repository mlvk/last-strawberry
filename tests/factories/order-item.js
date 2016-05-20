import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('order-item', {
  default: {
    item: FactoryGuy.belongsTo('item'),
    quantity: 10
  }
});
