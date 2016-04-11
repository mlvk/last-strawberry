import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/location-settings', 'Integration | Component | sections/locations/location settings', {
  integration: true
});

test('field and update and triggers a save', function(assert) {
  assert.expect(7);
  const locationData = {name:'Silverlake', code:'nw-001', deliveryRate:10};
  this.set('location', locationData);

  this.set('fieldChanged', (model, key, val) => {
    assert.ok(model, 'model undefined');
    assert.ok(key, 'key undefined');
    assert.ok(val, 'val undefined');
  });

  this.set('save', () => {
    assert.ok(true);
  });

  this.render(hbs`{{sections/locations/location-settings
                      model=location
                      fieldChanged=(action fieldChanged)
                      save=save}}`);

  assert.equal(this.$('.name').val(), locationData.name);
  assert.equal(this.$('.code').val(), locationData.code);
  assert.equal(this.$('.deliveryRate').val(), locationData.deliveryRate);

  // Should trigger addressChanged
  this.$('.name').change();

  // Should trigger save
  this.$('.name').trigger('onblur');
});
