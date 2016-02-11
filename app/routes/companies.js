import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const INCLUDES = [
  'locations',
	'locations.address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(){
    return this.store.query('company', {include:INCLUDES.join(',')});
	},

  actions: {
    showCompany(id) {
      this.transitionTo('companies.show', id);
    }
  }
});
