import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sales-order', 'Unit | Model | sales order', {
  // Specify the other units that are required for this test.
  needs: ['model:client', 'model:sales-order-item']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
