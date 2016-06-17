import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-plan', 'Unit | Model | route plan', {
  needs: [
    'model:user',
    'model:route-visit',
    'model:visit-window',
    'model:fulfillment'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
