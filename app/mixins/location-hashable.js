import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  locationHash: computed('lat', 'lng', function() {
    const lat = this.get("lat");
    const lng = this.get("lng");
    assert('Must declare a lat property when using the location-hashable mixin', lat);
    assert('Must declare a lng property when using the location-hashable mixin', lng);
    return `~${lat}_${lng}`;
  })
});
