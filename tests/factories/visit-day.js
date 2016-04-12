import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('visit-day', {
  default: {
    location: FactoryGuy.belongsTo('location'),
    day: FactoryGuy.generate(num => num),
    enabled: true
  }
});
