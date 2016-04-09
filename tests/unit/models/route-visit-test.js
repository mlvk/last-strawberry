import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

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
    'model:order-item'
  ]
});

test('calling customDestroy on a route-visit should also destroy hasMany fulfillments', function(assert) {
  let store = this.store();
  let model = this.subject();

  Ember.run(function(){
    let address = store.createRecord('address', {lat:'lat1', lng:'lng1'});
    let location = store.createRecord('location', {address});
    let visitWindow = store.createRecord('visit-window', {location});
    let order = store.createRecord('order', {location});

    model.set('visitWindow', visitWindow);

    model.consumeOrders([order]);

    assert.equal(store.peekAll('fulfillment').get('length'), 1);

    model.customDestroy();

    const activeFulfillments = store.peekAll('fulfillment')
      .filter(rp => !rp.get('isDeleted'))

    assert.equal(activeFulfillments.length, 0);
  })
});
