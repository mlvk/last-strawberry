import { moduleForModel, test } from 'ember-qunit';

moduleForModel('client-item-desire', 'Unit | Model | client item desire', {
  // Specify the other units that are required for this test.
  needs: ['model:item', 'model:client']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
