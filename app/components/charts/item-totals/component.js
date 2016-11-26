import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['col', 'card-1'],
  isHidden:true,

  @computed('orders.@each.{totalQuantity}')
  itemTotals(orders = Ember.A()) {
    return _
      .chain(orders.toArray())
      .map(order => order.get('orderItems').toArray())
      .flatten()
      .groupBy(orderItem => orderItem.get('item.name'))
      .mapValues(orderItems => orderItems.reduce((acc, cur) => acc + Number(cur.get('quantity')), 0))
      .map((quantity, name) => ({name, quantity}))
      .filter(row => row.quantity > 0)
      .value();
  },

  @computed('orders.@each.{totalQuantity}')
  totalUnits(orders = Ember.A()) {
    return orders.reduce((acc, cur) => acc + cur.get("totalQuantity"), 0);
  }
});
