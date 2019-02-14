import $ from 'jquery';
import { openDatepicker } from "ember-pikaday/helpers/pikaday";

import {
  create,
  clickable,
  collection,
  text,
  visitable,
  value,
  hasClass } from "ember-cli-page-object";

const page = create({
  visit: visitable("/sales-orders/:id")
});

const orderEditorPO = create({
  scope: ".debug_ui_order-editor",
  orderNumber: text(".orderNumber"),
  locationName: text(".locationInfo"),
  companyName: text(".company"),
  deliveryDate: value(".deliveryDate"),
  salesOrderItems: collection({
    itemScope: ".debug_ui_order-editor_order-item-editor",

    item: {
      name: text(".name"),
      quantity: text(".quantity"),
      total: text(".unitPriceContainer .label")
    }
  }),

  addProduct(item) {
    return selectChoose(".addOrderItemContainer", item.get("name"));
  },

  changeDeliveryDate(date) {
    openDatepicker($("input.deliveryDate")).selectDate(date);
  },

  deleteOrder: clickable(".toolbar .delete"),

  printDisabled: hasClass("disabled", ".print"),
  sendDisabled: hasClass("disabled", ".send")
});

const notificationsPO = create({
  notifications: collection({
    itemScope: ".notificationRow",
    item: {
      id: text(".id"),
      notificationState: text(".notificationState"),
      renderer: text(".renderer")
    }
  })
});

export {
  page,
  orderEditorPO,
  notificationsPO
};
