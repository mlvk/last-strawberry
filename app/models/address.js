import DS from 'ember-data';

export default DS.Model.extend({
  street: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zip: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  locations: DS.hasMany('location')
});
