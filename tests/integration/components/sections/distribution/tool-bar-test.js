import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { makeList, manualSetup } from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

moduleForComponent('sections/distribution/tool-bar', 'Integration | Component | sections/distribution/tool bar', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);
  }
});

test('does not render template select if there are no route-templates', function(assert) {
  this.set('handleDateSelected', () => assert.ok(true));
  this.set('handleNewRoutePlan', () => assert.ok(true));
  this.set('handleSaveRoutePlans', () => assert.ok(true));

  this.render(hbs`{{sections/distribution/tool-bar
    onDateSelected=(action handleDateSelected)
    newRoutePlan=(action handleNewRoutePlan)
    saveRoutePlans=(action handleSaveRoutePlans)
  }}`);

  assert.equal(this.$('.debug_sections_distribution_tool-bar select').length, 0);
});

test('renders route-plan templates select when template are present', function(assert) {
  this.set('routePlanTemplates', makeList('route-plan', 5));
  this.set('handleDateSelected', () => assert.ok(true));
  this.set('handleNewRoutePlan', () => assert.ok(true));
  this.set('handleSaveRoutePlans', () => assert.ok(true));

  this.render(hbs`{{sections/distribution/tool-bar
    routePlanTemplates=routePlanTemplates
    onDateSelected=(action handleDateSelected)
    newRoutePlan=(action handleNewRoutePlan)
    saveRoutePlans=(action handleSaveRoutePlans)
  }}`);

  assert.equal(this.$('.debug_sections_distribution_tool-bar select').length, 1);
});
