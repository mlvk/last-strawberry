import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

moduleForComponent('forms/elements/label-checkbox', 'Integration | Component | forms/elements/label checkbox', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
  }
});

test('it renders the correct label', function(assert) {
  this.set('label', 'test label')
  this.render(hbs`{{forms/elements/label-checkbox label=label}}`);

  assert.equal(this.$().text().trim(), 'test label');
});

test('it calls update action on click', function(assert) {
  assert.expect(1);

  this.set('label', 'test label');
  this.set('update', () => {
    assert.ok(true);
  });

  this.render(hbs`{{forms/elements/label-checkbox
    label=label
    update=update
  }}`);

  $('.debug_forms_elements_label-checkbox input').click();
});
