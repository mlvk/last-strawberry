import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('location', {
  default: {
    name: FactoryGuy.generate(num => `Location ${num}`),
    code: FactoryGuy.generate(num => `Code ${num}`),
    delivery_rate: 10,
    active: true,
    address: FactoryGuy.belongsTo('address'),
    visitWindows: FactoryGuy.hasMany('visit-window', 3),
    company: FactoryGuy.belongsTo('company'),
    itemDesires: FactoryGuy.hasMany('item-desire')
  }
});
