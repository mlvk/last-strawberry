import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const BEFORE_MODEL_INCLUDES = [
  'client-item-desires',
	'client-item-desires.item',
	'client-item-desires.client',
	'client-visit-days',
	'client-visit-days.client'
];

const MODEL_INCLUDES = [
	'client',
	'sales-order-items',
	'sales-order-items.item'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	queryParams: {
    deliveryDate: {
      refreshModel: true
    },
		clientId: {
			refreshModel: false
		}
  },

	setupController(controller, model) {
		const salesOrderMatch = this.store.peekAll('sales-order')
			.find(so => {
				const dateMatch = so.get('deliveryDate') === this.params.deliveryDate;
				const clientMatch = so.get('client.id') === this.params.clientId;
				return dateMatch && clientMatch;
			});

		controller.set('currentSalesOrder', salesOrderMatch);
		controller.set('salesOrders', this.store.peekAll('sales-order'));
		controller.set('clients', this.store.peekAll('client'));
		controller.set('items', this.store.peekAll('item'));
		this._super(controller, model);
	},

	beforeModel () {
		return this.store.query('client', {include:BEFORE_MODEL_INCLUDES.join(',')});
	},

	model(params){
		this.params = params;
		const deliveryDate = params.deliveryDate || '2015-10-22';
		return this.store.query('sales-order', {'filter[delivery_date]':deliveryDate, include:MODEL_INCLUDES.join(',')});
	}
});
