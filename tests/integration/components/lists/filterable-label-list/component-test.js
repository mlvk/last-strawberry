import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const collection = [{text:'Label 1', id:1}, {text:'Label 2', id:2}];

moduleForComponent('lists/filterable-label-list', 'Integration | Component | lists/filterable label list', {
  integration: true,

  beforeEach: function () {
    this.set('collection', collection);
    this.set('itemSelected', () => {});
    this.render(hbs`{{lists/filterable-label-list
                        itemClicked=itemSelected
                        model=collection}}`);
  }
});

test('it renders a collection', function(assert) {
  assert.expect(1);

  assert.equal(this.$('.name').length, collection.length);
});

test('it dispatches on item click', function(assert) {
  assert.expect(1);

  this.set('itemSelected', (id) => assert.equal(id, collection[0].id));

  this.$('.name')[0].click();
});
