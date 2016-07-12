import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { defaultPage, showPage } from 'last-strawberry/tests/pages/products';
import { authenticateSession, invalidateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  build,
  buildList,
  mockFind,
  mockQuery
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | products', {
  beforeEach() {
    // $.mockjaxSettings.logging = true;
    // $.mockjaxSettings.logging = 4;
    authenticateSession(this.application);
  }
});

test('guests cannot visit products', async function(assert) {
  invalidateSession(this.application);

  await defaultPage.visit();

  assert.equal(currentURL(), '/login');
});


test('does not show non product items', async function(assert) {
  const items = buildList('item', 10);
  mockQuery('item').returns({json:items});

  await defaultPage.visit();

  assert.equal(defaultPage.products().count, 0);
});

test('only shows items of tag product', async function(assert) {
  const products = buildList('product', 10);
  mockQuery('item').returns({json:products});

  await defaultPage.visit();

  assert.equal(defaultPage.products().count, 10);
});

test('selecting a product shows the detail of the product', async function(assert) {
  const product = make('product');

  mockQuery('item').returns({models:[product]});
  mockFind('item').returns({model:product});

  await defaultPage
    .visit()
    .products(0)
    .click();

  assert.equal(currentURL(), `/products/${product.get('id')}`);
});
