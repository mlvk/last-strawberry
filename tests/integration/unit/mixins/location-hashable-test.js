import Ember from 'ember';
import LocationHashableMixin from 'last-strawberry/mixins/location-hashable';
import { module, test } from 'qunit';

module('Unit | Mixin | location hashable');

// Replace this with your real tests.
test('it hashes correctly', function(assert) {
  var LocationHashableObject = Ember.Object.extend(LocationHashableMixin);
  var subject = LocationHashableObject.create();
  subject.set('lat', 'lat');
  subject.set('lng', 'lng');

  assert.equal(subject.get('locationHash'), '~lat_lng');
});
