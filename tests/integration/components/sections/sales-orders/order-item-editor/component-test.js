import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const dataModel = {
  item: {
    name: 'cheese'
  },
  quantity: 1
};

moduleForComponent('sections/sales-order/order-item-editor', 'Integration | Component | sections/sales orders/order item editor', {
  integration: true,

  beforeEach: function () {
    this.set('data', dataModel);

    this.set('update', () => {});
    this.set('save', () => {});
    this.set('delete', () => {});

    this.render(hbs`{{sections/sales-orders/order-item-editor
          update=(action update)
          save=(action save)
          delete=(action delete)
          model=data}}`);
  }
});

test('it displays item name', function(assert) {
  assert.equal(this.$('.orderItem').text().trim(), dataModel.item.name);
});

test('it displays quantity', function(assert) {
  assert.equal(this.$('.quantity').val(), dataModel.quantity);
});

test('it calls update when quantity is changed', function(assert) {
  assert.expect(2);

  this.set('update', (model, quantity) => {
    assert.ok(!!model);
    assert.equal(quantity, 2);
  });

  this.$('.quantity').val(2);
  this.$('.quantity').change();
});

test('it calls save onblur quantity', function(assert) {
  assert.expect(1);

  this.set('save', (model) => {
    assert.ok(!!model);
  });

  this.$('.quantity').trigger('onblur');
});

test('it calls delete when deleted', function(assert) {
  assert.expect(1);

  this.set('delete', (model) => {
    assert.ok(!!model);
  });

  this.$('.delete').click();
});
