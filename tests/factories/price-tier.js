import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('price-tier', {
  default: {
    name: FactoryGuy.generate(num => `Price Tier ${num}`),
    companies: FactoryGuy.hasMany('company'),
    itemPrices: FactoryGuy.hasMany('item-price')
  }
});
