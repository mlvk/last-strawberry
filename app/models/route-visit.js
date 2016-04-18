import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, not, notEmpty } = Ember.computed;

export default Model.extend(LocationHashable, {
  position:       attr('number'),
  arriveAt:       attr('number'),
  departAt:       attr('number'),

  fulfillments:   hasMany('fulfillment'),
  routePlan:      belongsTo('route-plan'),
  visitWindow:    belongsTo('visit-window'),

  isValid:        notEmpty('fulfillments'),
  lat:            alias('visitWindow.lat'),
  lng:            alias('visitWindow.lng'),

  @computed('position')
  positionFormatted(position) {
    return position + 1;
  },

  @computed('routePlan.colorScheme.{color}')
  color(val) {
    return val;
  },

  @computed('routePlan.colorScheme.{backgroundColor}')
  backgroundColor(val) {
    return val;
  },

  @computed('fulfillments.@each.{isPending}')
  pending(fulfillments) {
    return fulfillments.any(f => f.get('isPending'));
  },

  fulfilled: not('pending'),

  consumeOrders (orders) {
    const matchingOrders = orders.filter(o => o.get('locationHash') === this.get('locationHash'));
    const unmatchedOrders = orders.filter(o => o.get('locationHash') !== this.get('locationHash'));

    matchingOrders.forEach(o => this._createFulfillment(o));
    unmatchedOrders.forEach(o => this._destroyFulfillmentsWithOrder(o));

    return unmatchedOrders;
  },

  customDestroy() {
    this.get('fulfillments').forEach(f => f.destroyRecord());
    this.destroyRecord();
  },

  _destroyFulfillmentsWithOrder (order) {
    this.get('fulfillments')
      .filter(f => f.get('order.id') === order.get('id'))
      .forEach(f => f.destroyRecord());
  },

  //
  // _removeFulfillment (f) {
  //   this.get('fulfillments').removeObject(f);
  //   f.destroyRecord();
  // },

  _hasFulfillmentWithOrder(order) {
    return this.get('fulfillments').any(f => f.get('order.id') === order.get('id'));
  },

  _createFulfillment(order) {
    if(!this._hasFulfillmentWithOrder(order)){
      const routeVisit = this;
      
      const fulfillment = this.get('store').createRecord('fulfillment', {order, routeVisit});
      this.get('fulfillments').pushObject(fulfillment);
    }
  }
});
