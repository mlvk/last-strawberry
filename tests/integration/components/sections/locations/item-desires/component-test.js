import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/item-desires', 'Integration | Component | sections/locations/item desires', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{sections/locations/item-desires}}`);

  assert.equal(this.$().text().trim(), '');
});
