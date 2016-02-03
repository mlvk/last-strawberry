import Ember from 'ember';
import LocationHashableMixin from '../../../mixins/location-hashable';
import { module, test } from 'qunit';

module('Unit | Mixin | location hashable');

// Replace this with your real tests.
test('it works', function(assert) {
  var LocationHashableObject = Ember.Object.extend(LocationHashableMixin);
  var subject = LocationHashableObject.create();
  assert.ok(subject);
});
