import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'stretch'],

  hasStubAction: notEmpty('stubOrders'),

  @computed('orders', 'query')
  filterOrders(orders, query){
    return orders
      .filter(so => {
        const reg = new RegExp(query, 'i');
        return reg.test(so.get('location.company.name'));
      });
  },

  @computed('filterOrders')
  groupedOrders(orders) {
    return _
      .chain(orders)
      .sortBy(item => item.get('location.company.name'))
      .groupBy(item => item.get('location.company.name'))
      .value();
  },

  actions: {
    filterOrders(query) {
      this.set('query', query);
    }
  }
});
