import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('salesOrders.@each.{deliveryDate}', 'deliveryDate')
  filteredSalesOrders(salesOrders, deliveryDate) {
    return salesOrders.filter(order => {
      const matchesDate = order.get('deliveryDate') === deliveryDate;
      return matchesDate && order.get('isSalesOrder')
    });
  }
});
