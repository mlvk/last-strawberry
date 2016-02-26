import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/location/address-creator', 'Integration | Component | section/location/address creator', {
  integration: true
});

test('field and update and triggers a save', function(assert) {
  assert.expect(5);

  this.set('address', {street:'1 Center St', city:'New York'});

  this.set('fieldChanged', (model, key, val) => {
    assert.ok(model, 'model undefined');
    assert.ok(key, 'key undefined');
    assert.ok(val, 'val undefined');
  });

  this.set('save', () => {
    assert.ok(true);
  });

  this.render(hbs`{{section/location/address-creator
                      model=address
                      fieldChanged=(action fieldChanged)
                      save=save}}`);

  assert.equal(this.$('.street').val(), '1 Center St');

  // Should trigger addressChanged
  this.$('.street').change();

  // Should trigger save
  this.$('.street').trigger('onblur');
});
