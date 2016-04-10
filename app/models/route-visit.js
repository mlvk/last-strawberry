import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';

const { computed: { notEmpty, alias }} = Em;

export default DS.Model.extend(LocationHashable, {
  routePlan: DS.belongsTo('route-plan'),
  fulfillments: DS.hasMany('fulfillment'),
  visitWindow: DS.belongsTo('visit-window'),
  position: DS.attr('number'),
  arriveAt: DS.attr('number'),
  departAt: DS.attr('number'),
  isValid: notEmpty('fulfillments'),
  lat: alias('visitWindow.lat'),
  lng: alias('visitWindow.lng'),

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
      const fulfillment = this.get('store').createRecord('fulfillment', {order, routeVisit:this});
      this.get('fulfillments').pushObject(fulfillment);
    }

  }
});
