import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('salesOrders.@each.{deliveryDate}', 'deliveryDate')
  filteredSalesOrders(salesOrders, deliveryDate) {
    return salesOrders.filter(order => {
      const matchesDate = order.get('deliveryDate') === deliveryDate;
      return matchesDate && order.get('isSalesOrder')
    });
  },

  filteredItems: filterBy('items', 'isSold', true),
  customerLocations: filterBy('locations', 'isCustomer', true),

  actions: {
    onRequestNewOrder() {
      this.set('showCreateSalesOrderModal', true);
    },

    closeCreateSalesOrder() {
      this.set('showCreateSalesOrderModal', false);
    }
  }
});
