import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const collection = Immutable.fromJS([
  {id:1, text:'Item 1', enabled: true},
  {id:2, text:'Item 2', enabled: false},
  {id:3, text:'Item 3', enabled: true}]);

moduleForComponent('ui/label-checkbox-group', 'Integration | Component | ui/label checkbox group', {
  integration: true,

  beforeEach() {
    this.set('collection', collection.toJS());
    this.set('change', () => {})
    this.render(hbs`{{ui/label-checkbox-group
                        change=(action change)
                        model=collection}}`);
  }
});

test('it renders the correct number of items', function(assert) {
  assert.expect(1);

  assert.equal(this.$('.ui-label-checkbox').length, collection.size);
});

test('it dispatches the updated data when an item is toggled', function(assert) {
  assert.expect(1);

  const expectedResult = Immutable.fromJS([
    {id:1, text:'Item 1', enabled: false},
    {id:2, text:'Item 2', enabled: false},
    {id:3, text:'Item 3', enabled: true}]);

  this.set('change', (updatedCollection) => {
    assert.ok(expectedResult.equals(Immutable.fromJS(updatedCollection)));
  });
  this.$('.ui-label-checkbox')[0].click();
});

test('it correctly sets enabled status class on items', function(assert) {
  assert.expect(collection.size);
  const domElms = this.$('.ui-label-checkbox');

  collection.forEach((data, i) => {
    const elm = domElms[i];
    if(data.enabled) {
      assert.ok(this.$(elm).hasClass(elm));
    } else {
      assert.notOk(this.$(elm).hasClass(elm));
    }
  });
});
