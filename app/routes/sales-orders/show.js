import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const INCLUDES = [
	'order-items',
	'order-items.item',
  'location',
  'location.company',
  'location.item-desires',
  'location.item-desires.item'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		controller.set('items', this.store.peekAll('item'));
	},

	model(params){
    this.params = params;
    return this.store.findRecord('order', params.id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
	}
});
