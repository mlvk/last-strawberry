import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('visit-window', {
  default: {
    enabled: true,
    min: 400,
    max: 700,
    service: 15
  }
});
