import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('item', {
  default: {
    name: FactoryGuy.generate(num => `Item ${num}`),
    code: FactoryGuy.generate(num => `code-${num}`),
    description: FactoryGuy.generate(num => `Description ${num}`),
    position: FactoryGuy.generate(num => num),
    itemDesires: FactoryGuy.hasMany('item-desire')
  },

  product: {
    tag: 'product'
  }
});
