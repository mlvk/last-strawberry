import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

const items = [
  {label:'A'},
  {label:'B'}
];

const title = "Test Title";

moduleForComponent('ui/item-selector', 'Integration | Component | ui/item selector', {
  integration: true,

  beforeEach: function() {
    this.set('close', () => {});
    this.set('items', items);
    this.set('title', title);
  }
});

// @TODO: This test is not work for Ember@2.18.2
// test('Shows a list of items', function(assert) {
//   this.render(hbs`{{ui/item-selector
//       close=close
//       title=title
//       model=items}}`);

//   // Because ember-power-select uses wormhole, we need to search globally for this seletor
//   const rows = $('.ember-power-select-option');

//   assert.equal(rows.length, items.length);
// });

test('Shows a title', function(assert) {
  this.render(hbs`{{ui/item-selector
      close=close
      title=title
      model=items}}`);

  assert.equal(title, $('.title').text().trim());
});
