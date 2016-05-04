import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias } = Ember.computed;

export default Model.extend(LocationHashable, {
  name:                 attr('string'),
  deliveryRate:         attr('number',  { defaultValue: 10 }),
  active:               attr('boolean', { defaultValue: true }),

  address:              belongsTo('address'),
  company:              belongsTo('company'),
  itemDesires:          hasMany('item-desire'),
  orders:               hasMany('order'),
  visitDays:            hasMany('visit-day'),
  visitWindows:         hasMany('visit-window'),

  defaultVisitWindow:   alias('visitWindows.firstObject'),
  lat:                  alias('address.lat'),
  lng:                  alias('address.lng')
});
