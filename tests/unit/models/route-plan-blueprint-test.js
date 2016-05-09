import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-plan-blueprint', 'Unit | Model | route plan blueprint', {
  // Specify the other units that are required for this test.
  needs: ['model:route-plan-blueprint-slot']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
