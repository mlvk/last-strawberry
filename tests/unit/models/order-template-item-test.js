import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order-template-item', 'Unit | Model | order template item', {
  // Specify the other units that are required for this test.
  needs: ['model:order-template', 'model:item']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
