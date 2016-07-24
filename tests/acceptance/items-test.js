import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import page from 'last-strawberry/tests/pages/items';

import {
  // mockCreate,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | items');

test('admins can list all items', async function(assert) {
  authenticateSession(this.application);

  mockFindAll('company');
  mockFindAll('item', 10);
  await page.visit();

  assert.equal(page.items().count, 10);
});

// test('admins can create new items', async function(assert) {
//   authenticateSession(this.application);
//
//   mockFindAll('company');
//   mockFindAll('item', 10);
//   mockCreate('item');
//
//   await page
//     .visit();
//
//   debugger;
//
//   await page.createNewItem();
//
//   assert.equal(page.items().count, 11);
// });
