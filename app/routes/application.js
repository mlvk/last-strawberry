import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: computed(function() {
    return 'sales-orders';
  }),

  routeIfAlreadyAuthenticated: computed(function() {
    return 'sales-orders';
  }),

  actions: {
    navigateToRoute(route) {
      this.transitionTo(route);
    }
  }
});
