import FactoryGuy from "ember-data-factory-guy";
import PublishedStates from "last-strawberry/constants/published-states";
import {
  make,
  makeList
} from 'ember-data-factory-guy';

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

const buildValidSalesOrder = () => {
  const order = make("order", "sales-order");

  makeList("order-item", 5, {order, quantity:5, unitPrice:5});

  return order;
}

export {
  buildValidSalesOrder
}
