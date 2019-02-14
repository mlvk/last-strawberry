import Controller from '@ember/controller';
import { computed } from '@ember/object';

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Controller.extend({
  queryParams: ["deliveryDate", "includePublished", "includeUnpublished", "companyQuery", "includedItems"],

  deliveryDate: tomorrow,
  includePublished: true,
  includeUnpublished: true,
  companyQuery: "",
  includedItems: "",

  filteredOrders: computed("orders.@each.{deliveryDate,isPurchaseOrder}", "deliveryDate", function() {
    const orders = this.get("orders");
    const deliveryDate = this.get("deliveryDate");
    return orders.filter(order => {
      const matchesDate = order.get("deliveryDate") === deliveryDate;
      return matchesDate && order.get("isPurchaseOrder");
    });
  }),

  isOldDate: computed("deliveryDate", function() {
    const deliveryDate = this.get("deliveryDate");
    return moment(deliveryDate).isBefore(tomorrow);
  }),

  unfulfilledLocations: computed("locations.@each.{active,isVendor}", "filteredOrders.[]", function() {
    const locations = this.get("locations");
    const purchaseOrders = this.get("filteredOrders");
    const fulfilledLocations = purchaseOrders.map(o => o.get("location").content);
    const allLocations = locations
      .filter(l => l.get("active") && l.get("isVendor"))
      .toArray();

    return _.difference(allLocations, fulfilledLocations);
  }),

  allItems: computed("items.@each.{isPurchased,active}", function() {
    const items = this.get("items");
    return items
            .filter(item => item.get("isPurchased") && item.get("active"))
            .sortBy("name");
  }),

  actions: {
    onRequestNewOrder() {
      this.set("showCreateOrderModal", true);
    },

    closeCreateOrder() {
      this.set("showCreateOrderModal", false);
    },

    updateIncludedItems(items) {
      const selected = items.map((item) => item.id).join(",");
      this.set("includedItems", selected);
    }
  }
});
