import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const SALES_ORDER_INCLUDES = [
  'client',
  'sales-order-items',
  'client.visit-windows',
  'client.visit-windows.client'
];

const ROUTE_PLAN_INCLUDES = [
  'route-visits',
  'route-visits.sales-orders',
  'route-visits.visit-window',
  'user'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    date: {
      refreshModel: true
    }
  },

  setupController (controller, model) {
    this._super(controller, model);
    controller.set('salesOrders', this.store.peekAll('sales-order'));
    controller.set('routePlans', this.store.peekAll('route-plan'));
    controller.set('users', this.store.peekAll('user'));
    controller.set('clients', this.store.peekAll('client'));
  },

  model (params) {
    return Ember.RSVP.all([
      this.store.query('sales-order', {'filter[delivery_date]':params.date, include:SALES_ORDER_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[date]':params.date, include:ROUTE_PLAN_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[template]':true, include:'route-visits,route-visits.visit-window,user'}),
      this.store.findAll('user')
    ]);
  }
});
