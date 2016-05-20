import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('route-plan-blueprint', {
  default: {
    name: FactoryGuy.generate(num => `Route Plan Blueprint - ${num}`),
    routePlanBlueprintSlots: FactoryGuy.hasMany('route-plan-blueprint-slot')
  }
});
