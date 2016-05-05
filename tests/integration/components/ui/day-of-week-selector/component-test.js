import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';
import { manualSetup } from 'ember-data-factory-guy';

moduleForComponent('ui/day-of-week-selector', 'Integration | Component | ui/day of week selector', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);
  }
});

test('it renders days of week', function(assert) {
  this.render(hbs`{{ui/day-of-week-selector}}`);
  assert.equal(this.$('.debug_ui_label-checkbox').length, 7);
});
