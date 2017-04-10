import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { computed } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
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
