import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ["col", "card-1"],

  @computed("orders.@each.{totalQuantity}")
  itemTotals(orders = A()) {
    return _
      .chain(orders.toArray())
      .map(order => order.get("orderItems").toArray())
      .flatten()
      .groupBy(orderItem => orderItem.get("item.name"))
      .mapValues(orderItems =>
        orderItems.reduce((acc, cur) =>
          ({p:cur.get("item.position"), q:acc["q"] + Number(cur.get("quantity"))}), {p:0, q:0}))

      .map(({p, q}, name) => ({name, quantity:q, position:p}))
      .filter(row => row.quantity > 0)
      .sortBy(["position"])
      .value();
  },

  @computed("orders.@each.{totalQuantity}")
  totalUnits(orders = A()) {
    return orders.reduce((acc, cur) => acc + cur.get("totalQuantity"), 0);
  }
});
