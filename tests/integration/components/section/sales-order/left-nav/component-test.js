import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/sales-order/left-nav', 'Integration | Component | section/sales order/left nav', {
  integration: true
});

test('clicking stub orders triggers callback', function(assert) {
  assert.expect(1);

  this.set('handleStubOrders', () => {
    assert.ok(true);
  });

  this.render(hbs`{{section/sales-order/left-nav
        stubOrders=(action handleStubOrders)}}`);

  this.$('.stubOrders').click();
});
