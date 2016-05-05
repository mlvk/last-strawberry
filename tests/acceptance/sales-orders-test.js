import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { page } from 'last-strawberry/tests/pages/sales-orders';

import {
  make,
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
  mockFindAll('order', 5, {deliveryDate: tomorrow});

  await page.visit({deliveryDate: tomorrow});
  
  assert.equal(page.locations().count, 5, 'Wrong number of locations rendered');
});

test('should show sales order when location is clicked', async function(assert) {
  const order = make('order', {deliveryDate: tomorrow});

  mockFindAll('order').returns({models: [order]});
  mockFind('order').returns({model: order});

  await page
    .visit({deliveryDate: tomorrow})
    .locations(0)
    .click();

  assert.equal(currentURL(), `/sales-orders/${order.get('id')}`, 'URL does not match expected');
});
