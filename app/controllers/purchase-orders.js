import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('orders.@each.{deliveryDate}', 'deliveryDate')
  filteredOrders(orders, deliveryDate) {
    return orders.filter(order => {
      const matchesDate = order.get('deliveryDate') === deliveryDate;
      return matchesDate && order.get('isPurchaseOrder')
    });
  },

  vendorLocations: filterBy('locations', 'isVendor', true),

  actions: {
    onRequestNewOrder() {
      this.set('showCreateOrderModal', true);
    },

    closeCreateOrder() {
      this.set('showCreateOrderModal', false);
    }
  }
});
