import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { makeList, manualSetup } from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

moduleForComponent('sections/distribution/tool-bar', 'Integration | Component | sections/items/item table', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);

    this.set('archiveItem', () => {});
    this.set('saveItem', () => {});
    this.set('updateItemField', () => {});
  }
});

test('it renders active items by default', function(assert) {
  const items = makeList('item', 10);

  this.set('items', items);

  this.render(hbs`{{sections/items/item-table
    archiveItem=archiveItem
    updateItemField=updateItemField
    saveItem=saveItem
    items=items}}`);

  assert.equal($('.debug_sections_items_item-table_table-row').length, 10);
});

test('it does not render inactive items by default', function(assert) {
  const items = makeList('item', 10, {active:false});

  this.set('items', items);

  this.render(hbs`{{sections/items/item-table
    archiveItem=archiveItem
    updateItemField=updateItemField
    saveItem=saveItem
    items=items}}`);

  assert.equal($('.debug_sections_items_item-table_table-row').length, 0);
});

test('it renders inactive items when requested', function(assert) {
  const items = makeList('item', 10, {active:false});

  this.set('items', items);

  this.render(hbs`{{sections/items/item-table
    showInactive=true
    archiveItem=archiveItem
    updateItemField=updateItemField
    saveItem=saveItem
    items=items}}`);

  assert.equal($('.debug_sections_items_item-table_table-row').length, 10);
});
