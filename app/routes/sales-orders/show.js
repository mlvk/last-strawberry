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

		const salesOrderController = this.controllerFor('sales-orders');
		salesOrderController.set('currentSelectedOrder', model);
	},

	model(params){
    this.params = params;
    return this.store.findRecord('order', params.id, {include:INCLUDES.join(',')});
	},

	clearSalesOrderController: function(){
		const salesOrderController = this.controllerFor('sales-orders');
    salesOrderController.set('currentSelectedOrder', undefined);
  }.on('deactivate'),

	actions: {
		updateOrderItem(model, quantity) {
			model.set('quantity', quantity);
		},

		saveOrderItem(model) {
			if(model.get('hasDirtyAttributes')) {
				return model.save();
			}
		},

		deleteOrderItem(model) {
			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo('sales-orders');
		}
	}
});
