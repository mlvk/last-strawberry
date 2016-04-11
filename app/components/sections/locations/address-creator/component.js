import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
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
      // const queryString = query.split(' ');
      const geoApiUrl = 'https://nominatim.openstreetmap.org/search';
      const queryUrl = `${geoApiUrl}?q=${query}&format=json&addressdetails=1`
      //  http://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=xml&polygon=1&addressdetails=1
      const response = await Em.$.ajax(queryUrl);

      const {lat, lon, address: { house_number, road, city, state, postcode}} = response[0];
      const street = `${house_number} ${road}`;

      this.attrs.update({lat:Number(lat), lng:Number(lon), street, city, state, zip:postcode});

      // this.get('model').setProperties({lat:Number(lat), lng:Number(lon), street, city, state, zip:postcode})
    }
  }
});
