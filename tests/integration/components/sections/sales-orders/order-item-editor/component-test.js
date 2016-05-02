import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { make, manualSetup } from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

let model;

moduleForComponent('sections/sales-order/order-item-editor', 'Integration | Component | sections/sales orders/order item editor', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);

    model = make('order-item');

    this.set('model', model);
    this.set('update', () => {});
    this.set('onOrderItemChange', () => {});
    this.set('save', () => {});
    this.set('delete', () => {});

    this.render(hbs`{{sections/sales-orders/order-item-editor
          update=(action update)
          onOrderItemChange=(action onOrderItemChange)
          save=(action save)
          delete=(action delete)
          model=model}}`);
  }
});

test('it displays item name', function(assert) {
  assert.equal(this.$('.name').text().trim(), model.get('item.name'));
});

test('it displays quantity', function(assert) {
  assert.equal(this.$('.quantity').val(), model.get('quantity'));
});

test('it calls update when quantity is changed', function(assert) {
  assert.expect(6);

  this.set('update', (model, field, val) => {
    assert.ok(!!model);
    assert.equal(field, 'quantity');
    assert.equal(val, 2);
  });

  this.$('.quantity').val(2);
  this.$('.quantity').change();

  this.set('update', (model, field, val) => {
    assert.ok(!!model);
    assert.equal(field, 'unitPrice')
    assert.equal(val, 5.40);
  });

  this.$('.unitPrice').click();

  this.$('.unitPriceEditing input').val(5.40);
  this.$('.unitPriceEditing input').change();
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
