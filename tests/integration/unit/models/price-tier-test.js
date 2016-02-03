import { moduleForModel, test } from 'ember-qunit';

moduleForModel('price-tier', 'Unit | Model | price tier', {
  // Specify the other units that are required for this test.
  needs: ['model:item-price']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
