import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/dd-card', 'Integration | Component | ui/dd card', {
  integration: true
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

test('it triggers action when actionIcon clicked', function(assert) {
  assert.expect(1);
  this.set('actionHandler', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#ui/dd-card action=(action actionHandler)}}
      <span class='code'>code1</span>
    {{/ui/dd-card}}
  `);

  this.$('.debug_ui_icon-button').click();
});
