import DS from 'ember-data';
import computed from 'ember-computed-decorators';

export default DS.Model.extend({
  street: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zip: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  locations: DS.hasMany('location'),

  @computed('street', 'city', 'state', 'zip')
  full(street, city, state, zip) {
    return `${street}, ${city}, ${state} ${zip}`;
  }
});
