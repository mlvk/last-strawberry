import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/location/location-settings', 'Integration | Component | section/location/location settings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{section/location/location-settings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#section/location/location-settings}}
      template block text
    {{/section/location/location-settings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
