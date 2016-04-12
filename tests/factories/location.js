import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('location', {
  default: {
    company: FactoryGuy.belongsTo('company'),
    address: FactoryGuy.belongsTo('address'),
    name: FactoryGuy.generate(num => `Location ${num}`),
    code: FactoryGuy.generate(num => `Code ${num}`),
    delivery_rate: 10,
    active: true,
    visitWindows: FactoryGuy.hasMany('visit-window', 1),
    itemDesires: FactoryGuy.hasMany('item-desire'),
    visitDays: FactoryGuy.hasMany('visit-day')
  }
});
