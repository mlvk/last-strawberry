import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/sales-order/left-nav', 'Integration | Component | sections/sales orders/left nav', {
  integration: true
});

test('clicking stub orders triggers callback', function(assert) {
  assert.expect(1);

  this.set('handleStubOrders', () => {
    assert.ok(true);
  });

  this.render(hbs`{{sections/sales-orders/left-nav
        stubOrders=(action handleStubOrders)}}`);

  this.$('.stubOrders').click();
});
