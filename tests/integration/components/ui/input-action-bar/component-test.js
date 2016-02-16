import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/input-action-bar', 'Integration | Component | ui/input action bar', {
  integration: true
});

test('Submitting the field via button calls action with correct arg', function(assert) {
  assert.expect(1);

  const inputContent = "Test Input Content";

  this.set('submit', (value) => {
    assert.equal(value, inputContent, "Content didn't match");
  });

  this.render(hbs`{{ui/input-action-bar submit=(action submit)}}`);

  this.$('input').val(inputContent);
  this.$('input').change();

  this.$('.btn').click();
});

test('Submitting the field via enter calls action with correct arg', function(assert) {
  assert.expect(1);

  const inputContent = "Test Input Content";

  this.set('submit', (value) => {
    assert.equal(value, inputContent, "Content didn't match");
  });

  this.render(hbs`{{ui/input-action-bar submit=(action submit)}}`);

  this.$('input').val(inputContent);
  this.$('input').change();

  this.$('input').trigger($.Event( "keyup", { keyCode: 13, code: "Enter" } ));
});
