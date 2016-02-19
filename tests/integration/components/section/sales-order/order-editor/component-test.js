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
    { name: 'cheese' },
    { name: 'milk' },
    { name: 'eggs' }
  ]
};

moduleForComponent('section/sales-order/order-editor', 'Integration | Component | section/sales order/order editor', {
  integration: true,

  beforeEach: function () {
    this.set('data', dataModel);

    this.render(hbs
      `{{section/sales-order/order-editor
          model=data}}`);
  }
});

test('it displays the company name', function(assert) {
  assert.equal(this.$('.locationName').text().trim(), dataModel.location.name);
});

test('it displays a list of order-items', function(assert) {
  assert.equal(this.$('.orderItem').length, 3);
});
