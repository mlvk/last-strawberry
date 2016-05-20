import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { page } from 'last-strawberry/tests/pages/sales-orders';

import {
  make,
  makeList,
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

moduleForAcceptance('Acceptance | sales orders', {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll('item');
    mockFindAll('company');
  }
});

test('navigates to correct url', async function(assert) {
  mockFindAll('order');

  await page.visit();

  assert.equal(currentURL(), '/sales-orders');
});

test('should automatically show tomorrows orders', async function(assert) {
  mockFindAll('order', {deliveryDate: tomorrow});

  await page.visit({deliveryDate: tomorrow});

  assert.equal(currentURL(), `/sales-orders?deliveryDate=${tomorrow}`);
});

test('should display correct number of sales orders', async function(assert) {
  const salesOrders = makeList('sales_order', 5);
  mockFindAll('order').returns({models: salesOrders});

  await page.visit();

  assert.equal(page.orders().count, 5, 'Wrong number of orders rendered');
});

test('should show sales order when location is clicked', async function(assert) {
  const salesOrder = make('sales_order');

  mockFindAll('order').returns({models: [salesOrder]});
  mockFind('order').returns({model: salesOrder});

  await page
    .visit()
    .orders(0)
    .click();

  assert.equal(currentURL(), `/sales-orders/${salesOrder.get('id')}`, 'URL does not match expected');
});
