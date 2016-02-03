import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rows/grouped-orders-list-row', 'Integration | Component | rows/grouped orders list row', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{rows/grouped-orders-list-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#rows/grouped-orders-list-row}}
      template block text
    {{/rows/grouped-orders-list-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
