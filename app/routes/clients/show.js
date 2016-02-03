import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('enums', {items:this.store.peekAll('item')});
    this._super(controller, model);
  },

  model(params){
    return this.store.findRecord('client', params.id, {
      adapterOptions: {
        query: {
          include:'client-item-desires,client-item-desires.item,client-item-desires.client,client-visit-days,client-visit-days.client'
        }
      }
    });
  }
});
