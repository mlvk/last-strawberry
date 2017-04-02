import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { make, manualSetup } from "ember-data-factory-guy";
import decorateComponentClass from "last-strawberry/tests/helpers/decorate-component-class";
import { orderEditorPO } from "last-strawberry/tests/pages/sales-orders-show";

import {
  buildValidSalesOrder
} from "last-strawberry/tests/factories/order";

let model;

moduleForComponent("sections/sales-order/order-editor", "Integration | Component | ui/order editor", {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);

    orderEditorPO.setContext(this);

    model = make("order");

    this.set("model", model);
    this.set("items", []);
    this.set("handler", () => {});

    this.render(hbs`{{ui/order-editor
          saveOrder=(action handler)
          updateShipping=(action handler)
          updateOrderItem=(action handler)
          saveOrderItem=(action handler)
          deleteOrderItem=(action handler)
          items=items
          model=model
          updateDeliveryDate=(action handler)}}`);
  },

  afterEach() {
    orderEditorPO.removeContext();
  }
});

test("it displays the company name", function(assert) {
  assert.equal(this.$(".locationInfo").text().trim(), `${model.get("location.code")} - ${model.get("location.name")}`);
});

test("it displays a list of order-items", function(assert) {
  assert.equal(this.$(".debug_sections_sales-orders_order-item-editor").length, model.get("orderItems.length"));
});

test("it displays comment of order", function(assert) {
  assert.equal(this.$("textarea.comment").val(), model.get("comment"));
});

test("it should enable print button when order isValid", function(assert) {
  this.set("model", buildValidSalesOrder());
  assert.ok(!orderEditorPO.printDisabled);
});

test("it should enable send button when order isValid", function(assert) {
  this.set("model", buildValidSalesOrder());
  assert.ok(!orderEditorPO.sendDisabled);
});

test("it should disable print button when order is not valid", function(assert) {
  assert.ok(orderEditorPO.printDisabled);
});

test("it should disable send button when order is not valid", function(assert) {
  assert.ok(orderEditorPO.sendDisabled);
});
