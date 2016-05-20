import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('route-plan-blueprint-slot', {
  default: {
    position: FactoryGuy.generate(num => num),
    address: FactoryGuy.belongsTo('address'),
    routePlanBlueprint: FactoryGuy.belongsTo('route-plan-blueprint')
  }
});
