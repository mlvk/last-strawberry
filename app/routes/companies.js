import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller) {
    controller.set('companies', this.store.peekAll('company'));
  },

	model(){
    return Ember.RSVP.all([
      this.store.findAll('item'),
      this.store.findAll('price-tier'),
      this.store.findAll('company')
    ]);
	},

  actions: {
    showCompany(id) {
      this.transitionTo('companies.show', id);
    }
  }
});
