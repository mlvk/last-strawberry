import { moduleForModel, test } from 'ember-qunit';

moduleForModel('location', 'Unit | Model | location', {
  // Specify the other units that are required for this test.
  needs: ['model:address', 'model:company', 'model:item-desire', 'model:visit-day', 'model:price-tier']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
