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
  this.set('onDateSelected', () => assert.ok(true));
  this.set('createRoutePlan', () => assert.ok(true));
  this.set('applyTemplate', () => assert.ok(true));
  this.set('printFulfillmentDocuments', () => assert.ok(true));

  this.render(hbs`{{sections/distribution/tool-bar
    onDateSelected=(action onDateSelected)
    createRoutePlan=(action createRoutePlan)
    applyTemplate=(action applyTemplate)
    printFulfillmentDocuments=(action printFulfillmentDocuments)
  }}`);

  assert.equal(this.$('.debug_sections_distribution_tool-bar .templateSelect').length, 0);
});

test('renders route-plan templates select when template are present', function(assert) {
  this.set('routePlanBlueprints', makeList('route-plan-blueprint', 5));
  this.set('onDateSelected', () => assert.ok(true));
  this.set('createRoutePlan', () => assert.ok(true));
  this.set('applyTemplate', () => assert.ok(true));
  this.set('printFulfillmentDocuments', () => assert.ok(true));

  this.render(hbs`{{sections/distribution/tool-bar
    routePlanBlueprints=routePlanBlueprints
    onDateSelected=(action onDateSelected)
    createRoutePlan=(action createRoutePlan)
    applyTemplate=(action applyTemplate)
    printFulfillmentDocuments=(action printFulfillmentDocuments)
  }}`);

  assert.equal(this.$('.debug_sections_distribution_tool-bar .templateSelect').length, 1);
});
