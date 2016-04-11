import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/title-bar', 'Integration | Component | ui/title bar', {
  integration: true
});

test('it renders title', function(assert) {
  assert.expect(1);

  this.set('index', 1);
  this.set('title', 'test-title');

  this.render(hbs`{{ui/title-bar
    title=title
    index=index}}`);

  assert.equal(this.$('.title').text().trim(), 'test-title');
});

test('it doesnt render action button when action is missing', function(assert) {
  assert.expect(1);

  this.set('index', 1);
  this.set('title', 'test-title');

  this.render(hbs`{{ui/title-bar
    title=title
    index=index}}`);

  assert.equal(this.$('.debug_ui_icon-button').length, 0);
});

test('it renders action button when action is present', function(assert) {
  assert.expect(1);

  this.set('index', 1);
  this.set('title', 'test-title');
  this.set('clickHandler', () => {});

  this.render(hbs`{{ui/title-bar
    title=title
    index=index
    action=(action clickHandler)}}`);

  assert.equal(this.$('.debug_ui_icon-button').length, 1);
});

test('it triggers delete when action set and delete clicked', function(assert) {
  assert.expect(1);

  this.set('index', 1);
  this.set('clickHandler', () => {
    assert.ok(true);
  });
  this.set('title', 'test-title');

  this.render(hbs`{{ui/title-bar
    title=title
    index=index
    action=(action clickHandler)}}`);

  this.$('.debug_ui_icon-button').click();
});
