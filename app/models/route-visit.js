import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, not, empty, notEmpty } = Ember.computed;

export default Model.extend(LocationHashable, {
  position:       attr('number'),
  arriveAt:       attr('number'),
  departAt:       attr('number'),

  fulfillments:   hasMany('fulfillment'),
  routePlan:      belongsTo('route-plan'),

  address:        belongsTo('address'),

  isValid:        notEmpty('fulfillments'),

  visitWindow:    alias('address.visitWindows.firstObject'),
  lat:            alias('address.lat'),
  lng:            alias('address.lng'),

  isOrphan:       empty('routePlan.id'),

  @computed('routePlan.colorScheme.{color}')
  color(val) {
    return val;
  },

  @computed('routePlan.colorScheme.{backgroundColor}')
  backgroundColor(val) {
    return val;
  }
});
