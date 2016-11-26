import FactoryGuy from "ember-data-factory-guy";
import PublishedStates from "last-strawberry/constants/published-states";

FactoryGuy.define("order", {
  default: {
    deliveryDate: moment().add(1, "days").format("YYYY-MM-DD"),
    location: FactoryGuy.belongsTo("location"),
    orderItems: FactoryGuy.hasMany("order-item"),
    note: "sample note content"
  },

  traits: {
    published: {
      publishedState: PublishedStates.PUBLISHED
    }
  },

  sales_order: {
    orderType: "sales-order"
  },

  purchase_order: {
    orderType: "purchase-order"
  }
});
