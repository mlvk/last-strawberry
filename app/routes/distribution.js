import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const ORDER_INCLUDES = [
  'location',
  'location.address',
  'location.company',
  'location.visit-windows',
  'location.visit-windows.location',
  'order-items'
];

const ROUTE_PLAN_INCLUDES = [
  'route-visits',
  'route-visits.orders',
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
    controller.set('orders', this.store.peekAll('order'));
    controller.set('routePlans', this.store.peekAll('route-plan'));
    controller.set('users', this.store.peekAll('user'));
    controller.set('locations', this.store.peekAll('location'));
  },

  model (params) {
    return Ember.RSVP.all([
      this.store.query('order', {'filter[delivery_date]':params.date, include:ORDER_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[date]':params.date, include:ROUTE_PLAN_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[template]':true, include:ROUTE_PLAN_INCLUDES.join(',')}),
      this.store.findAll('user')
    ]);
  }
});
