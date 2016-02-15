import { moduleForModel, test } from 'ember-qunit';

moduleForModel('visit-window-day', 'Unit | Model | visit window day', {
  // Specify the other units that are required for this test.
  needs: ['model:visit-window']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
