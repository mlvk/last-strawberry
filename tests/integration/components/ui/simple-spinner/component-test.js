import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/simple-spinner', 'Integration | Component | ui/simple spinner', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/simple-spinner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/simple-spinner}}
      template block text
    {{/ui/simple-spinner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
