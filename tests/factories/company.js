import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('company', {
  default: {
    name: FactoryGuy.generate(num => `Company ${num}`),
    code: FactoryGuy.generate(num => `Code ${num}`),
    priceTier: FactoryGuy.belongsTo('price-tier')
  }
});
