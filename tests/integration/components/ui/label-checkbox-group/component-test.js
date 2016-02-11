import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const collection = Immutable.fromJS([
  {id:1, label:'Item 1', enabled: true},
  {id:2, label:'Item 2', enabled: false},
  {id:3, label:'Item 3', enabled: true}]);

moduleForComponent('ui/label-checkbox-group', 'Integration | Component | ui/label checkbox group', {
  integration: true,

  beforeEach() {
    this.set('collection', collection.toJS());
    this.set('changed', () => {})
    this.render(hbs`{{ui/label-checkbox-group
                        changed=(action changed)
                        model=collection}}`);
  }
});

test('it renders items', function(assert) {
  assert.expect(1);

  assert.equal(this.$('.item').length, collection.size);
});

test('it dispatches new collection of item change', function(assert) {
  assert.expect(1);

  const expectedResult = Immutable.fromJS([
    {id:1, label:'Item 1', enabled: false},
    {id:2, label:'Item 2', enabled: false},
    {id:3, label:'Item 3', enabled: true}]);

  this.set('changed', (updatedCollection) => {
    assert.ok(expectedResult.equals(Immutable.fromJS(updatedCollection)));
  });

  this.$('.item')[0].click();

});
