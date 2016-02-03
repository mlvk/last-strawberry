import Ember from 'ember';
import ColorsInitializer from '../../../initializers/colors';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | colors', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ColorsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
