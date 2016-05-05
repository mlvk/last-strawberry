import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/visit-windows-manager', 'Integration | Component | sections/locations/visit windows manager', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/locations/visit-windows-manager}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/locations/visit-windows-manager}}
      template block text
    {{/sections/locations/visit-windows-manager}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
