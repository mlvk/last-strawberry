import Em from 'ember';
import computed from 'ember-computed-decorators';
import co from "npm:co";

// const { computed: { union }} = Em;

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
    return orders
      .map(o => o.get('visitWindow'))
      .filter(vw => (!!vw));
  },

  @computed('routePlans.@each.{date}', 'date')
  activeRoutePlans(rps, date) {
    return rps.filter(rp => rp.get('date') === date);
  },

  @computed('routePlans.@each.{template}')
  routeTemplates(rps) {
    return rps.filter(rp => rp.get('template'));
  },

  saveRoutePlan(routePlan) {
    co(function *(){
      yield routePlan.save();

      const rvs = yield routePlan.get('routeVisits');
      yield rvs.save();

      const orders = _.flatten(rvs.map(rv => rv.get('orders')));

      orders.forEach(o => o.save());
    });
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

    saveRoutePlans () {
      this.get('activeRoutePlans').forEach(::this.saveRoutePlan);
    },

    destroyRoutePlan (routePlan) {
      co(function *(){
        const rvs = (yield routePlan.get('routeVisits')).toArray();
        rvs.forEach(rv => rv.unloadRecord());
        yield routePlan.destroyRecord();
      });
    },

    saveAsTemplate (routePlan) {
      const store = this.get('store');

      co(function *(){
        const rp = store.createRecord('route-plan', {name:String('template' + Math.random()), template:true});
        yield rp.save();

        const rvs = yield routePlan.get('routeVisits');
        const newRVS = rvs.map(rv => {
          const cloneData = {
            visitWindow: rv.get('visitWindow'),
            position: rv.get('position'),
            routePlan: rp
          };

          return store.createRecord('route-visit', cloneData);
        });

        yield newRVS.map(p => p.save());
      }).catch(() => {});
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
