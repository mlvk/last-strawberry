import Ember from 'ember';
import EnableComponentTestingInitializer from '../../../initializers/enable-component-testing';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | enable component testing', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EnableComponentTestingInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
