import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order-template', 'Unit | Model | order template', {
  // Specify the other units that are required for this test.
  needs: ['model:order-template-day', 'model:order-template-item', 'model:location']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
