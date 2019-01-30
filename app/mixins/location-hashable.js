import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';
import { computed } from 'ember-decorators/object';

export default Mixin.create({
  @computed('lat', 'lng')
  locationHash(lat, lng) {
    assert('Must declare a lat property when using the location-hashable mixin', lat);
    assert('Must declare a lng property when using the location-hashable mixin', lng);
    return `~${lat}_${lng}`;
  }
});
