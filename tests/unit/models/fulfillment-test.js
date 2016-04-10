import { moduleForModel, test } from 'ember-qunit';

moduleForModel('fulfillment', 'Unit | Model | fulfillment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:route-visit',
    'model:order'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
