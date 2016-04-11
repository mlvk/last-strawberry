import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const dataModel = {
  location: {
    company: {
      name: 'bar'
    },
    name : 'foo'
  },
  orderItems: [
    { name: 'cheese', quantity: 1 },
    { name: 'milk', quantity: 2 },
    { name: 'eggs', quantity: 3 }
  ]
};

moduleForComponent('sections/sales-order/order-editor', 'Integration | Component | sections/sales orders/order editor', {
  integration: true,

  beforeEach: function () {
    this.set('data', dataModel);

    this.set('updateOrderItem', () => {});
    this.set('saveOrderItem', () => {});
    this.set('deleteOrderItem', () => {});

    this.render(hbs`{{sections/sales-orders/order-editor
          updateOrderItem=(action updateOrderItem)
          saveOrderItem=(action saveOrderItem)
          deleteOrderItem=(action deleteOrderItem)
          model=data}}`);
  }
});

test('it displays the company name', function(assert) {
  assert.equal(this.$('.locationName').text().trim(), dataModel.location.name);
});

test('it displays a list of order-items', function(assert) {
  assert.equal(this.$('.orderItem').length, 3);
});
