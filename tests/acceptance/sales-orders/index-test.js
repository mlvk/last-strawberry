import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import { page } from "last-strawberry/tests/pages/sales-orders";
import { page as showPage } from "last-strawberry/tests/pages/sales-orders-show";
import Ember from "ember";

import {
  build,
  make,
  mockCreate,
  makeList,
  mockFindRecord,
  mockFindAll
} from "ember-data-factory-guy";

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

moduleForAcceptance("Acceptance | sales orders", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("item");
    mockFindAll("company");
  }
});

test("navigates to correct url", async function(assert) {
  mockFindAll("order");

  await page.visit();

  assert.equal(currentURL(), "/sales-orders");
});

test("should automatically show tomorrows orders", async function(assert) {
  mockFindAll("order", {deliveryDate: tomorrow});

  await page.visit({deliveryDate: tomorrow});

  assert.equal(currentURL(), `/sales-orders?deliveryDate=${tomorrow}`);
  assert.notOk(page.bannerIsVisible);
});

test("should display correct number of sales orders", async function(assert) {
  const salesOrders = makeList("sales_order", 5);
  mockFindAll("order").returns({models: salesOrders});

  await page.visit();

  assert.equal(page.orders().count, 5, "Wrong number of orders rendered");
});

test("should show sales order when location is clicked", async function(assert) {
  const salesOrder = make("sales_order");

  mockFindAll("order").returns({models: [salesOrder]});
  mockFindRecord("order").returns({model: salesOrder});

  await page
    .visit()
    .orders(0)
    .click();

  assert.equal(currentURL(), `/sales-orders/${salesOrder.get("id")}`, "URL does not match expected");
});

test("should display warning banner when deliveryDate param <= today", async function(assert) {
  mockFindAll("order");
  mockFindRecord("order");

  const deliveryDate = moment().format("YYYY-MM-DD");

  await page.visit({deliveryDate});
  assert.ok(page.bannerIsVisible);
});

test("show be able to create a new sales order from the quick menu", async function(assert) {
  await Ember.run(async function() {

    const location = make("location");
    const salesOrder = build("sales_order", {location});
    const { id, orderNumber } = salesOrder.get();

    mockCreate('order').returns({attrs:{id, location}});
    mockFindRecord('order').returns({json:salesOrder});

    mockFindAll("order");

    await page
      .visit()
      .openQuickMenu();

    assert.equal(0, page.orders().count, "Wrong number of orders rendered");

    await page
      .createOrder()
      .selectLocation(location);

    assert.equal(1, page.orders().count, "Wrong number of orders rendered");

    assert.equal(orderNumber, showPage.orderNumber, "Wrong orderNumber rendered");
  });
});

test("shows filterd items only after filtered items", async function(assert) {
  const firstCompany = make("company", {name:"first company"});
  const firstLocation = make("location", {company:firstCompany});
  const firstOrder = make("sales_order", {location:firstLocation});
  const firstItem = make("product", {name:"first item"});
  make("order-item", {item:firstItem, order:firstOrder});

  const secondCompany = make("company", {name:"second company"});
  const secondLocation = make("location", {company:secondCompany});
  const secondOrder = make("sales_order", {location:secondLocation});
  const secondItem = make("product", {name:"second item"});
  make("order-item", {item:secondItem, order:secondOrder});

  mockFindAll("order").returns({models: [firstOrder, secondOrder]});

  await page
   .visit()
   .toggleFilterOptions()
   .selectFilterItem(firstItem);

  assert.equal(page.orders().count, 1, "Number of orders do not match expected");
});

test("shows filterd items base on query string includedItems", async function(assert) {
  const firstCompany = make("company", {name:"first company"});
  const firstLocation = make("location", {company:firstCompany});
  const firstOrder = make("sales_order", {location:firstLocation});
  const firstItem = make("product", {name:"first item"});
  make("order-item", {item:firstItem, order:firstOrder});

  const secondCompany = make("company", {name:"second company"});
  const secondLocation = make("location", {company:secondCompany});
  const secondOrder = make("sales_order", {location:secondLocation});
  const secondItem = make("product", {name:"second item"});
  make("order-item", {item:secondItem, order:secondOrder});

  mockFindAll("order").returns({models: [firstOrder, secondOrder]});

  await page
   .visit({includedItems: firstItem.get("id")});

  assert.equal(page.orders().count, 1, "Number of orders do not match expected");
});

test("should not display unpublished orders after uncheck Draft checkbox", async function(assert) {
  const unpublishedOrders = makeList("sales_order", 2);
  const publishedOrders = makeList("sales_order", 3, "published");

  mockFindAll("order").returns({models: _.concat(unpublishedOrders, publishedOrders)});

  await page
    .visit()
    .toggleFilterOptions()
    .toggleIncludeDraft();

  assert.equal(page.orders().count, publishedOrders.length, "Wrong number of orders filtered");
});

test("should not display unpublished orders if query string value is includeUnpublished=false", async function(assert) {
  const unpublishedOrders = makeList("sales_order", 2);
  const publishedOrders = makeList("sales_order", 3, "published");

  mockFindAll("order").returns({models: _.concat(unpublishedOrders, publishedOrders)});

  await page
    .visit({includeUnpublished:false});

  assert.equal(page.orders().count, publishedOrders.length, "Wrong number of orders filtered");
});

test("should not display published orders after uncheck Approved checkbox", async function(assert) {
  const unpublishedOrders = makeList("sales_order", 2);
  const publishedOrders = makeList("sales_order", 3, "published");

  mockFindAll("order").returns({models: _.concat(unpublishedOrders, publishedOrders)});

  await page
    .visit()
    .toggleFilterOptions()
    .toggleIncludePublished();

  assert.equal(page.orders().count, unpublishedOrders.length, "Wrong number of orders filtered");
});

test("should not display published orders if query string value is includePublished=false", async function(assert) {
  const unpublishedOrders = makeList("sales_order", 2);
  const publishedOrders = makeList("sales_order", 3, "published");

  mockFindAll("order").returns({models: _.concat(unpublishedOrders, publishedOrders)});

  await page
    .visit({includePublished:false});

  assert.equal(page.orders().count, unpublishedOrders.length, "Wrong number of orders filtered");
});
