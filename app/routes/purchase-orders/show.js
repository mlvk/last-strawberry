import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const INCLUDES = [
	'order-items',
	'order-items.item',
  'location',
  'location.company'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		controller.set('items', this.store.peekAll('item'));

		const purchaseOrderController = this.controllerFor('purchase-orders');
		purchaseOrderController.set('currentSelectedOrder', model);
	},

	model(params){
    this.params = params;
    return this.store.findRecord('order', params.id, {include:INCLUDES.join(',')});
	},

	clearPurchaseOrderController: function(){
		const purchaseOrderController = this.controllerFor('purchase-orders');
    purchaseOrderController.set('currentSelectedOrder', undefined);
  }.on('deactivate'),

	actions: {
		async createOrderItem(item) {
			const order = this.modelFor('purchase-orders.show');
			const company = await order.get('location.company');

			this.store
				.createRecord('order-item', {item, order, unitPrice:0})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		saveOrderItem(model) {
			if(model.get('hasDirtyAttributes')) {
				return model
					.save()
					.catch(() => model.rollbackAttributes());
			}
		},

		deleteOrderItem(model) {
			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo('purchase-orders');
		}
	}
});
