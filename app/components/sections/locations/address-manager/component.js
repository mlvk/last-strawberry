import Component from '@ember/component';
import { computed } from '@ember/object';
import {
  placeToObject
} from 'last-strawberry/utils/google-place-utils';

export default Component.extend({
  classNames: ['section_location_address-manager', 'col', 'stretch'],

  willRender(){
    this.get('changeset').validate();
  },

  lat: computed('changeset.lat', function() {
    const val = this.get("changeset.lat");
    return val || 33.89891688437142
  }),

  lng: computed('changeset.lng', function() {
    const val = this.get("changeset.lng");
    return val || -117.90527343750001
  }),

  zoom: 13,

  actions: {
    update(place) {
      const changeset = this.get('changeset');
      changeset.setProperties(placeToObject(place));
      if(changeset.get('isValid')){
        this.get("saveAddress")(changeset);
      }
    },
    onBlur() {
       this.get('changeset').rollback();
    }
  }
});
