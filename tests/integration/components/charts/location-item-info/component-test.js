import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/location-item-info', 'Integration | Component | charts/location item info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/location-item-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/location-item-info}}
      template block text
    {{/charts/location-item-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
