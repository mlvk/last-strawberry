import { moduleForModel, test } from 'ember-qunit';

moduleForModel('item-price', 'Unit | Model | item price', {
  // Specify the other units that are required for this test.
  needs: ['model:item', 'model:price-tier']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
