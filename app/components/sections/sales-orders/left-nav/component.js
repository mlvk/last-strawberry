import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['section_sales-order_left-nav', 'row', 'stretch'],

  @computed('salesOrders', 'query')
  filterOrders(salesOrders, query){
    return salesOrders
      .filter(so => {
        const reg = new RegExp(query, 'i');
        return reg.test(so.get('location.company.name'));
      });
  },

  @computed('filterOrders')
  groupedSalesOrders(salesOrders) {
    return _
      .chain(salesOrders)
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
