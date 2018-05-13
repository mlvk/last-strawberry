import { moduleFor, test } from 'ember-qunit';

moduleFor('route:sales-orders/show', 'Unit | Route | sales-orders/show', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:firebaseMgr']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
