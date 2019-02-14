import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Controller.extend({
  queryParams: ["deliveryDate", "includePublished", "includeUnpublished", "companyQuery", "includedItems"],

  deliveryDate: tomorrow,
  includePublished: true,
  includeUnpublished: true,
  companyQuery: "",
  includedItems: "",

  filteredSalesOrders: computed("salesOrders.@each.{deliveryDate,isSalesOrder}", "deliveryDate", function() {
    const salesOrders = this.get("salesOrders");
    const deliveryDate = this.get("deliveryDate");
    return salesOrders.filter(order => {
      const matchesDate = order.get("deliveryDate") === deliveryDate;
      return matchesDate && order.get("isSalesOrder");
    });
  }),

  unfulfilledLocations: computed("locations.@each.{active,isCustomer}", "filteredSalesOrders.[]", function() {
    const locations = this.get("locations");
    const salesOrders = this.get("filteredSalesOrders");
    const fulfilledLocations = salesOrders.map(o => o.get("location").content);
    const allLocations = locations
      .filter(l => l.get("active") && l.get("isCustomer"))
      .toArray();

    return _.difference(allLocations, fulfilledLocations);
  }),

  isOldDate: computed("deliveryDate", function() {
    const deliveryDate = this.get("deliveryDate");
    return moment(deliveryDate).isBefore(tomorrow);
  }),

  filteredItems: filterBy("items", "isSold", true),

  allItems: computed("items.@each.{isSold,active}", function() {
    const items = this.get("items");
    return items
            .filter(item => item.get("isSold") && item.get("active"))
            .sortBy("name");
  }),

  actions: {
    onRequestNewOrder() {
      this.set("showCreateSalesOrderModal", true);
    },

    onRequestDuplicateOrders() {
      this.set("showDuplicateOrdersModal", true);
    },

    closeCreateSalesOrder() {
      this.set("showCreateSalesOrderModal", false);
    },

    closeDuplicateOrders() {
      this.set("showDuplicateOrdersModal", false);
    },

    updateIncludedItems(items) {
      const selected = items.map((item) => item.id).join(",");
      this.set("includedItems", selected);
    }
  }
});
