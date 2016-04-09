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
    orders
      .filter(o => o.get('locationHash') === this.get('locationHash'))
      .map(o => this._addOrder(o));

    this._removeMissingOrders(orders);

    return orders.filter(o => o.get('locationHash') !== this.get('locationHash'));
  },

  customDestroy() {
    this.get('fulfillments').forEach(f => f.destroyRecord());
    this.destroyRecord();
  },

  _removeMissingOrders (orders) {
    this.get('fulfillments').forEach(f => {
      const hasOrder = orders.any(o => o === f.get('order'));

      if(!hasOrder){
        this._removeFulfillment(f);
      }
    });
  },

  _addOrder (order) {
    if(!this._containsOrder(order)){
      this._createFulfillment(order);
    }
  },

  _removeFulfillment (f) {
    this.get('fulfillments').removeObject(f);
    f.destroyRecord();
  },

  _containsOrder(order) {
    return this.get('fulfillments').any(f => f.get('order') === order);
  },

  _createFulfillment(order) {
    const fulfillment = this.get('store').createRecord('fulfillment', {order:order, routeVisit:this});
    this.get('fulfillments').pushObject(fulfillment);
  }
});
