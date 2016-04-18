import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const ORDER_INCLUDES = [
  'location',
  'location.address',
  'location.company',
  'location.visit-windows',
  'location.visit-windows.visit-window-days',
  'location.visit-windows.location',
  'order-items'
];

const ROUTE_PLAN_INCLUDES = [
  'route-visits',
  'route-visits.fulfillments',
  'route-visits.fulfillments.order',
  'route-visits.visit-window',
  'route-visits.route-plan',
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
  },

  model (params) {
    return Ember.RSVP.all([
      this.store.query('order', {'filter[delivery_date]':params.date, include:ORDER_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[date]':params.date, include:ROUTE_PLAN_INCLUDES.join(',')}),
      this.store.query('route-plan', {'filter[template]':true, include:ROUTE_PLAN_INCLUDES.join(',')}),
      this.store.findAll('user')
    ]);
  },

  async _saveRoutePlan(routePlan) {
    if(routePlan.get('hasDirtyAttributes')){
      await routePlan.save();
    }

    const rvs = await routePlan.get('routeVisits');

    rvs
      .filter(rv => rv.get('hasDirtyAttributes'))
      .forEach(async rv => await rv.save());

    rvs
      .map(rv => rv.get('fulfillments')
      .filter(f => f.get('hasDirtyAttributes'))
      .forEach(async f => await f.save()));
  },

  actions: {
    async saveTemplate (sourceRoutePlan, name) {
      const store = this.store;

      const routePlan = store.createRecord('route-plan', {name, template:true});
      await routePlan.save();

      const rvs = await sourceRoutePlan.get('routeVisits');
      rvs.forEach(async function(rv) {
        const visitWindow = rv.get('visitWindow');
        const position = rv.get('position');

        await store
          .createRecord('route-visit', {routePlan, visitWindow, position})
          .save();
      });
    },

    saveRoutePlans () {
      this.get('controller.activeRoutePlans').forEach(::this._saveRoutePlan);
    },

    async destroyRoutePlan (routePlan) {
      const fulfillments = routePlan.get('routeVisits')
        .map(rv =>
          rv.get('fulfillments')
            .map(f => f));

      const routeVisits = routePlan.get('routeVisits').map(rv => rv);
      const unloadCollection = _.concat(fulfillments, routeVisits);

      _.flatten(unloadCollection).forEach(r => r.unloadRecord());
      routePlan.destroyRecord();
    },

    async deleteRouteVisit(routePlan, routeVisit) {
      routeVisit.get('fulfillments').forEach(f => f.unloadRecord());
      routeVisit.destroyRecord();
    }
  }
});
