import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/distribution/map-pin', 'Integration | Component | sections/distribution/map pin', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/distribution/map-pin}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/distribution/map-pin}}
      template block text
    {{/sections/distribution/map-pin}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
