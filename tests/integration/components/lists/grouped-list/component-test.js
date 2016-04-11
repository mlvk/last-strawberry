import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const dataModel = {
  abc: [
    { location : { name : 'foo' } },
    { location : { name : 'bar' } }
  ]
};

moduleForComponent('lists/grouped-list', 'Integration | Component | lists/grouped list', {
  integration: true,
  beforeEach: function () {
    this.set('data', dataModel);
    this.set('handleItemClicked', () => {});

    this.render(hbs`{{lists/grouped-list
          model=data
          itemClicked=(action handleItemClicked)}}`);
  }
});

test('clicking items triggers callback', function(assert) {
  assert.expect(1);

  this.set('handleItemClicked', (item) => {
    assert.ok(!!item);
  });

  this.$('.child')[0].click();
});

test('parent groups should render group keys', function(assert) {
  assert.expect(1);
  assert.equal(this.$('.parent:eq(0)').text(), 'abc');
});
