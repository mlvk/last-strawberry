import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order-template-day', 'Unit | Model | order template day', {
  // Specify the other units that are required for this test.
  needs: ['model:order-template']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
