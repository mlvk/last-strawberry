import { moduleForModel, test } from 'ember-qunit';

moduleForModel('item-credit-rate', 'Unit | Model | item credit rate', {
  // Specify the other units that are required for this test.
  needs: ['model:item', 'model:location']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
