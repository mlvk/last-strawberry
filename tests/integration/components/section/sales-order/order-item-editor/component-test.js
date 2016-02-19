import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/sales-order/order-item-editor', 'Integration | Component | section/sales order/order item editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{section/sales-order/order-item-editor}}`);

  assert.equal(this.$().text().trim(), '');

});
