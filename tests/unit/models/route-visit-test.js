import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-visit', 'Unit | Model | route visit', {
  needs: [
    'model:route-plan',
    'model:visit-window',
    'model:order',
    'model:fulfillment',
    'model:location',
    'model:address',
    'model:company',
    'model:item-desire',
    'model:visit-day',
    'model:visit-window-day',
    'model:order-item',
    'model:item-credit-rate'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
