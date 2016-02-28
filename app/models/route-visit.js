import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';

const { computed: { notEmpty, alias }} = Em;

export default DS.Model.extend(LocationHashable, {
  routePlan: DS.belongsTo('route-plan'),
  position: DS.attr('number'),
  arriveAt: DS.attr('number'),
  departAt: DS.attr('number'),
  notes: DS.attr('string'),
  completed_at: DS.attr('string'),
  orders: DS.hasMany('order'),
  visitWindow: DS.belongsTo('visit-window'),
  isValid: notEmpty('orders'),
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

  _removeMissingOrders (orders) {
    this.get('orders').forEach(o => {
      if(!orders.contains(o)){
        this._removeOrder(o);
      }
    });
  },

  _addOrder (order) {
    if(!this.get('orders').contains(order)){
      this.get('orders').pushObject(order);
    }
  },

  _removeOrder (order) {
    if(this.get('orders').contains(order)){
      this.get('orders').removeObject(order);
    }
  }
});
