import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';

const { computed: { notEmpty, union }} = Em;

export default DS.Model.extend(LocationHashable, {
  routePlan: DS.belongsTo('route-plan'),
  position: DS.attr('number'),
  arriveAt: DS.attr('number'),
  departAt: DS.attr('number'),
  notes: DS.attr('string'),
  completed_at: DS.attr('string'),
  salesOrders: DS.hasMany('sales-order'),
  orders: union('salesOrders', 'customOrders'),
  visitWindow: DS.belongsTo('visit-window'),
  isValid: notEmpty('orders'),

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
    const collection = this._getCollection(order);
    if(!collection.contains(order)){
      collection.pushObject(order);
    }
  },

  _removeOrder (order) {
    const collection = this._getCollection(order);
    if(collection.contains(order)){
      collection.removeObject(order);
    }
  },

  _getCollection (order) {
    const key = order.get('type').camelize().pluralize();
    return this.get(key);
  }
});
