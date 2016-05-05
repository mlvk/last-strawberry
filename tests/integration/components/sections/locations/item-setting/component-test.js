import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/item-setting', 'Integration | Component | sections/locations/item setting', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/locations/item-setting}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/locations/item-setting}}
      template block text
    {{/sections/locations/item-setting}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
