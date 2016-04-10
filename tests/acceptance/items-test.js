import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { mockFindAll, mockCreate } from 'ember-data-factory-guy';
import page from '../pages/items';

moduleForAcceptance('Acceptance | items');

test('admins can list all items', function(assert) {
  authenticateSession(this.application);

  mockFindAll('item', 10);
  page.visit();

  andThen(function() {
    assert.equal(page.items().count, 10);
  });
});

test('admins can create new items', function(assert) {
  authenticateSession(this.application);

  mockFindAll('item', 10);
  mockCreate('item');

  page
    .visit()
    .createNewItem();

  andThen(function() {
    assert.equal(page.items().count, 11);
  });
});
