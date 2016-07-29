import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/price-row', 'Integration | Component | ui/price row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('updateModelField', () => {});
  this.set('saveModelIfDirty', () => {});
  this.render(hbs`{{ui/price-row
    updateModelField=updateModelField
    saveModelIfDirty=saveModelIfDirty
    }}`);

  assert.equal(this.$().text().trim(), '');

});
