import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/item-location-sales-trend', 'Integration | Component | charts/item location sales trend', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/item-location-sales-trend}}`);

  // assert.equal(this.$().text().trim(), 'template block text');
});
