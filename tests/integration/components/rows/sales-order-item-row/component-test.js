import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rows/sales-order-item-row', 'Integration | Component | rows/sales order item row', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{rows/sales-order-item-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#rows/sales-order-item-row}}
      template block text
    {{/rows/sales-order-item-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
