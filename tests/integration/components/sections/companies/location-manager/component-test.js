import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/companies/location-manager', 'Integration | Component | sections/companies/location manager', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/companies/location-manager}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/companies/location-manager}}
      template block text
    {{/sections/companies/location-manager}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
