import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/location/address-picker', 'Integration | Component | section/location/address picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{section/location/address-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#section/location/address-picker}}
      template block text
    {{/section/location/address-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
