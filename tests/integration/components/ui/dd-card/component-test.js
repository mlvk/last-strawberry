import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { manualSetup } from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

moduleForComponent('ui/dd-card', 'Integration | Component | ui/dd card', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);
  }
});

test('it renders block content', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#ui/dd-card}}
      <span class='code'>code1</span>
    {{/ui/dd-card}}
  `);

  assert.equal(this.$('.code').text().trim(), 'code1');
});

test('it triggers action when action icon clicked', function(assert) {
  assert.expect(1);
  this.set('actionHandler', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#ui/dd-card as |card|}}
      {{card.title-bar action=actionHandler}}
    {{/ui/dd-card}}
  `);

  this.$('.debug_ui_dd-card .action').click();
});
