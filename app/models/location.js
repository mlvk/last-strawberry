import DS from 'ember-data';
import Em from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';

const { computed: { alias }} = Em;

export default DS.Model.extend(LocationHashable, {
  active: DS.attr('boolean', {defaultValue:true}),
  address: DS.belongsTo('address'),
  code: DS.attr('string'),
  company: DS.belongsTo('company'),
  deliveryRate: DS.attr('number', {defaultValue:10}),
  itemDesires: DS.hasMany('item-desire'),
  name: DS.attr('string'),
  orders: DS.hasMany('order'),
  visitDays: DS.hasMany('visit-day'),
  visitWindows: DS.hasMany('visit-window'),
  lat: alias('address.lat'),
  lng: alias('address.lng')
});
