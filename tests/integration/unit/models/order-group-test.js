import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order-group', 'Unit | Model | order group', {
  // Specify the other units that are required for this test.
  needs: ['model:route-visit', 'model:sales-order', 'model:purchase-order']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
