import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import ItemTypes from "last-strawberry/constants/item-types";
import NotificationRenderer from "last-strawberry/constants/notification-renderers";
import PublishedStates from "last-strawberry/constants/published-states";

const ORDER_INCLUDES = [
	"order-items",
	"order-items.item",
	"location",
	"location.company",
	"location.notification-rules",
	"notifications"
];

export default Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		const purchaseOrderController = this.controllerFor("purchase-orders");
		purchaseOrderController.set("currentSelectedOrder", model);

		controller.set("items", this.store.peekAll("item"));
	},

	model(params){
    return this.store.findRecord("order", params.id, { reload:true, include:ORDER_INCLUDES.join(",")});
	},

  deactivate() {
    const purchaseOrderController = this.controllerFor("purchase-orders");
    purchaseOrderController.set("currentSelectedOrder", undefined);
  },

	actions: {
		updateShipping(value) {
			const cleaned = parseFloat(value) || 0;
			const order = this.modelFor("purchase-orders.show");
			order.set("shipping", cleaned);
		},

		saveOrder() {
			const order = this.modelFor("purchase-orders.show");
			order.save();
		},

		emailOrder(model) {
			const notificationRules = model.get("location.notificationRules");
			const notifications = model.get('notifications');
			const renderer = isEmpty(notifications) ? NotificationRenderer.PURCHASE_ORDER : NotificationRenderer.UPDATED_PURCHASE_ORDER

			notificationRules.forEach(nr => {
				const notification = this.store.createRecord("notification", {
					renderer,
					order: model,
					notificationRule: nr
				});

				notification.save();
			});
		},

		async createNewItem(changeset) {
			const record = await this.store
				.createRecord("item", {
					company: changeset.get("company"),
					name: changeset.get("name"),
					code: changeset.get("code"),
					description: changeset.get("description"),
					unitOfMeasure: changeset.get("unitOfMeasure"),
					defaultPrice: changeset.get("defaultPrice"),
					tag: ItemTypes.INGREDIENT })
				.save();

				return record;
		},

		async createOrderItem(item) {
			const order = this.modelFor("purchase-orders.show");
			const unitPrice = item.get("defaultPrice");
			this.store
				.createRecord("order-item", {item, order, unitPrice})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		async saveOrderItem(orderItem) {
			if(orderItem.get("hasDirtyAttributes")) {

				return orderItem
					.save()
					.catch(() => orderItem.rollbackAttributes());
			}
		},

		async deleteOrderItem(model) {
			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo("purchase-orders");
		},

		toggleOrderState(model) {
			const updatedState = model.get("isUnpublished") ? PublishedStates.PUBLISHED : PublishedStates.UNPUBLISHED;
			model.set("publishedState", updatedState);

			model.save()
		},

		saveLocationNote(location, locationNote){
			const locationModel = location.content;

			locationModel.set("note", locationNote);
			locationModel.save();
		},

		updateDeliveryDate(order, newDate) {
			const formattedDate = moment(newDate).format("YYYY-MM-DD");

			if(order.get("deliveryDate") !== formattedDate){
				order.set("deliveryDate", formattedDate);
				order.save();
			}
		}
	}
});
