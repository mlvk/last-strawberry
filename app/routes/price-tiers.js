import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('price-tier');
  },

  actions: {
    showPriceTier(id) {
      this.transitionTo('price-tiers.show', id);
    },

    createNewPriceTier(/*name*/) {
      // console.log(name);
    }
  }
});
