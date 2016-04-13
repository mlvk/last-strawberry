import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Controller.extend({
  store: Em.inject.service(),
  queryParams: ['date'],
  date: moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('orders.@each.{deliveryDate}', 'date')
  selectedDateOrders(orders, date) {
    return orders.filter(o => o.get('deliveryDate') === date);
  },

  @computed('selectedDateOrders.@each.{empty}')
  validOrders(orders) {
    return orders.filter(o => !o.get('empty'));
  },

  @computed('validOrders.[]')
  visitWindows (orders) {
    return _.flatten(orders
        .map(o => o.get('location.visitWindows').toArray())
        .map(vw => vw)
      )
      .filter(vw => vw.validForDate(this.get('date')));
  },

  @computed('routePlans.@each.{date,template}', 'date')
  activeRoutePlans(rps, date) {
    return rps
      .filter(rp => !rp.get('template'))
      .filter(rp => rp.get('date') === date)
      .map((rp, index) => {
        rp.set('index', index)
        return rp;
      });
  },

  @computed('routePlans.@each.{template}')
  routePlanTemplates(rps) {
    return rps.filter(rp => rp.get('template'));
  },

  actions: {
    routePlanChanged(/* routePlan */) {

    },

    onDateSelected(date) {
      this.set('date', moment(date).format('YYYY-MM-DD'));
    },

    newRoutePlan () {
      this.get('store').createRecord('route-plan', {date:this.get('date')});
    },

    applyTemplate (routeTemplate) {
      const store = this.get('store');
      const rp = store.createRecord('route-plan', {date:this.get('date')});

      routeTemplate.get('routeVisits')
        .map(rv => {
          const cloneData = {
            visitWindow: rv.get('visitWindow'),
            position: rv.get('position'),
            routePlan: rp
          };

          return store.createRecord('route-visit', cloneData);
        });
    }
  }
});
