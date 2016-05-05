import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['section_location_address-creator', 'col', 'stretch'],

  @computed('model.lat')
  lat(val) {
    return val || 33.89891688437142
  },

  @computed('model.lng')
  lng(val) {
    return val || -117.90527343750001
  },

  zoom: 13,

  actions: {
    async searchAddress(query) {
      const geoApiUrl = 'https://nominatim.openstreetmap.org/search';
      const queryUrl = `${geoApiUrl}?q=${query}&format=json&addressdetails=1`

      const response = await Ember.$.ajax(queryUrl);

      const {lat, lon, address: { house_number, road, city, state, postcode}} = response[0];
      const street = `${house_number} ${road}`;

      this.attrs.update({lat:Number(lat), lng:Number(lon), street, city, state, zip:postcode});
    }
  }
});
