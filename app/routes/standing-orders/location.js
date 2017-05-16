import Ember from 'ember';

const MODEL_INCLUDES = [
	"company",
  "order-templates",
  "order-templates.order-template-items",
	"order-templates.order-template-items.item",
  "order-templates.order-template-days"
];

export default Ember.Route.extend({
	setupController(controller, model) {
		this.controllerFor('standing-orders').set("currentLocation", model);
		this.controllerFor('standing-orders.location').set("currentOrderTemplate", undefined);

		this._super(...arguments);
	},

  model(params) {
    return this.store.findRecord("location", params.location_id, {
      include:MODEL_INCLUDES.join(",")
    });
  },

	actions: {
		async createOrderTemplate() {
			const location = this.modelFor("standing-orders.location");
			const orderTemplate = this.store.createRecord('order-template', {location, startDate:moment().toDate()});
			await orderTemplate.save();

			this.transitionTo('standing-orders.location.order-template', orderTemplate.get('id'));
		},

		selectOrderTemplate(id) {
			this.transitionTo('standing-orders.location.order-template', id);
		}
	}
});
