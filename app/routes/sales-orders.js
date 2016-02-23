import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
import config from 'last-strawberry/config/environment';

const BEFORE_MODEL_INCLUDES = [
  'locations'
];

const MODEL_INCLUDES = [
	'order-items',
	'order-items.item',
  'location',
  'location.company'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
	queryParams: {
    deliveryDate: {
      refreshModel: true
    }
  },

	setupController(controller, model) {
    this._super(controller, model);
		controller.set('salesOrders', this.store.peekAll('order'));
		controller.set('companies', this.store.peekAll('company'));
	},

	model(params){
    this.params = params;

    return Ember.RSVP.all([
      this.store.findAll('item'),
      this.store.query('company', {include:BEFORE_MODEL_INCLUDES.join(',')}),
      this.store.query('order', {'filter[delivery_date]':params.deliveryDate, include:MODEL_INCLUDES.join(',')})
    ]);
	},

  actions: {
    showSalesOrder(order) {
      this.transitionTo('sales-orders.show', order.get('id'));
    },

    stubOrders () {
      const deliveryDate = this.paramsFor('sales-orders').deliveryDate;

      this.get('session').authorize('authorizer:devise', async (headerName, headerValue) => {

        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/orders/stub_orders`,
          data:{deliveryDate},
          headers,
          type:'POST'
        };

        const newOrders = await Ember.$.ajax(payload);
        this.store.pushPayload(newOrders);
      });
    },

    changeDeliveryDate(date) {
      const deliveryDate = this.paramsFor('sales-orders').deliveryDate;

      if(deliveryDate !== moment(date).format('YYYY-MM-DD')) {
        this.controllerFor('sales-orders').set('deliveryDate', moment(date).format('YYYY-MM-DD'));
        this.transitionTo('sales-orders');
      }
    }
  }
});
