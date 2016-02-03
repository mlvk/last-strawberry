import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  @computed('model.[]')
  companyOrders (salesOrders) {
    return _(salesOrders)
      .groupBy(o => o.get('company'))
      .map((orders, company) => ({company, orders}))
      .sortBy('company')
      .value();
  }
});
