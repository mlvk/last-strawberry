import { moduleForModel, test } from 'ember-qunit';

moduleForModel('client-visit-day', 'Unit | Model | client visit day', {
  // Specify the other units that are required for this test.
  needs: ['model:client']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
