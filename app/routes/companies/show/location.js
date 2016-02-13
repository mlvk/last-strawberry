import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'address',
  'item-desires',
  'item-desires.item'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('items', this.store.peekAll('item'));
  },

  model(params){
    return this.store.findRecord('location', params.location_id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
  },

  actions: {
    updateItemDesires(/* newItemDesires */) {
      // console.log(newItemDesires);
    }
  }
});
