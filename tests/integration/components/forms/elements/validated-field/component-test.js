import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/elements/validated-field', 'Integration | Component | forms/elements/validated field', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/elements/validated-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/elements/validated-field}}
      template block text
    {{/forms/elements/validated-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
