import Route from '@ember/routing/route';
import { isBlank } from '@ember/utils';

const MODEL_INCLUDES = [
	"order-template-items",
  "order-template-items.item",
  "order-template-days",
  "location",
  "location.company"
];

export default Route.extend({
  setupController(controller, model) {
    controller.set("items", this.store.peekAll("item"));

		this.controllerFor('standing-orders.location').set("currentOrderTemplate", model);
		
    this._super(...arguments);
  },

  model(params) {
    return this.store.findRecord("order-template", params.order_template_id, {
      include:MODEL_INCLUDES.join(",")
    });
  },

	actions: {
    createLineItem(orderTemplate, item) {
      this.store
        .createRecord('order-template-item', {orderTemplate, item})
        .save();
    },

    async onDaysChanged(orderTemplate, day, enabled) {
      const collection = await orderTemplate.get('orderTemplateDays');
      let match = collection.find(item => item.get('day') === day);

      if(isBlank(match)) {
        match = this.store.createRecord('order-template-day', {orderTemplate, day, enabled});
      }

      match.set('enabled', enabled);
      match.save();
    },

		dateSelected(model, date) {
			model.set('startDate', moment(date).format("YYYY-MM-DD"));
			model.save();
		},

    saveModel(model) {
      model.save();
    },

    deleteLineItem(model) {
      model.destroyRecord();
    },

		async deleteOrderTemplate(model) {
			const locationId = await model.get('location.id');
			await model.destroyRecord();
			this.transitionTo('standing-orders.location', locationId);
		}
	}
});
