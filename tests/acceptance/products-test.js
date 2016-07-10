import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import page from 'last-strawberry/tests/pages/products';
import { authenticateSession, invalidateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  buildList,
  mockQuery
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | products', {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('guests cannot visit products', async function(assert) {
  invalidateSession(this.application);

  await page.visit();

  assert.equal(currentURL(), '/login');
});


test('does not show non product items', async function(assert) {
  const items = buildList('item', 10);
  mockQuery('item').returns({json:items});

  await page.visit();

  assert.equal(page.products().count, 0);
});

test('only shows items of tag product', async function(assert) {
  const products = buildList('product', 10);
  mockQuery('item').returns({json:products});

  await page.visit();

  assert.equal(page.products().count, 10);
});

// test('selecting a product shows the detail of the product', async function(assert) {
//   const products = buildList('product', 1);
//   // const product = build('product');
//   mockQuery('item').returns({json:products});
//   mockFind('item');
//
//   await page
//     .visit()
//     .products(0)
//     .click();
//
//   assert.equal(currentURL(), '/products/1');
// });
