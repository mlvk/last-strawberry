import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-plan-blueprint-slot', 'Unit | Model | route plan blueprint slot', {
  // Specify the other units that are required for this test.
  needs: ['model:address', 'model:route-plan-blueprint']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
