import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route-plan', 'Unit | Model | route plan', {
  needs: [
    'model:user',
    'model:route-visit',
    'model:visit-window',
    'model:fulfillment'
  ]
});

test('calling customDestroy on a route-plan should also destroy hasMany route-visits', function(assert) {
  let model = this.subject();
  let store = this.store();

  const ot = {
    visitWindow:{locationHash:'loc-1'},
    belowLocationHash:undefined,
    fromRoutePlan:undefined,
    toRoutePlan:model
  };

  model.applyTranform(ot);

  assert.equal(store.peekAll('route-visit').get('length'), 1);

  model.customDestroy();

  const activeRoutePlans = store.peekAll('route-visit')
    .filter(rp => !rp.get('isDeleted'))

  assert.equal(activeRoutePlans.length, 0);
});
