import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);
  },

  model(params){
    return this.store.findRecord('location', params.location_id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
  }
});
