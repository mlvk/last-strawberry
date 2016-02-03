import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sales-order-item', 'Unit | Model | sales order item', {
  // Specify the other units that are required for this test.
  needs: ['model:sales-order', 'model:item']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
