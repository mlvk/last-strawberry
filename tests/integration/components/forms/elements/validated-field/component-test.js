import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';
import Changeset from 'ember-changeset';

moduleForComponent('forms/elements/validated-field', 'Integration | Component | forms/elements/validated field', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
  }
});

test('it renders the property', function(assert) {

  const model = {name:'Billy Bob'};
  const changeset = new Changeset(model);

  this.set('validateProperty', () => {});
  this.set('changeset', changeset);

  this.render(hbs`{{forms/elements/validated-field
      changeset=changeset
      property='name'
      validateProperty=(action validateProperty)
    }}`);

  assert.equal(this.$('input').val().trim(), model.name);
});

test('it calls the validation function on blur', function(assert) {
  assert.expect(4);

  const nextName = 'Dave';
  const model = {name:'Billy Bob'};
  const changeset = new Changeset(model);

  this.set('validateProperty', (changeset, key, val) => {
    assert.ok(changeset !== undefined);
    assert.ok(key === 'name');
    assert.ok(val === nextName)
  });
  this.set('changeset', changeset);

  this.render(hbs`{{forms/elements/validated-field
      changeset=changeset
      property='name'
      validateProperty=(action validateProperty)
    }}`);

  this.$('input').val(nextName);
  this.$('input').trigger('input');
  this.$('input').trigger('onblur');

  assert.equal(this.$('input').val().trim(), nextName);
});
