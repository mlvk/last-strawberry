import { or, notEmpty, not, alias } from '@ember/object/computed';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from 'ember-decorators/object';

export default Model.extend(LocationHashable, {
  date:             attr('string'),
  position:         attr('number'),
  arriveAt:         attr('number'),
  departAt:         attr('number'),
  fulfillmentCount: attr('number'),
  hasPickup:        attr('boolean'),
  hasDrop:          attr('boolean'),

  fulfillments:     hasMany('fulfillment'),
  routePlan:        belongsTo('route-plan'),
  address:          belongsTo('address'),

  isValid:          notEmpty('fulfillments'),

  visitWindow:      alias('address.visitWindows.firstObject'),
  lat:              alias('address.lat'),
  lng:              alias('address.lng'),

  location:         alias('address.locations.firstObject'),
  company:         alias('location.company'),

  hasRoutePlan:     notEmpty('routePlan.id'),
  routePlanId:      alias('routePlan.id'),
  noRoutePlan:      not('hasRoutePlan'),
  isOpen:           or('noRoutePlan', 'routePlan.isDeleted'),

  @computed('id', 'position')
  key(id, position) {
    return `${id}${position}`;
  }
});
