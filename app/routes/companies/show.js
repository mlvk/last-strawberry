import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'locations',
	'locations.address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(params){
    return this.store.findRecord('company', params.company_id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
  },

  actions: {
    showLocation(id) {
      this.transitionTo('companies.show.location', this.currentModel, id);
    }
  }
});
