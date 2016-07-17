import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { make, manualSetup } from 'ember-data-factory-guy';

moduleForComponent('sections/products/product-editor', 'Integration | Component | sections/products/product editor', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it renders all fields', function(assert) {

  const model = make('product');

  this.set('model', model);
  this.set('validateProperty', () => {});
  this.set('save', () => {});
  this.set('reset', () => {});

  this.render(hbs`{{sections/products/product-editor
      model=model
      validateProperty=validateProperty
      save=save
      reset=reset
    }}`);

  assert.equal(this.$('.name input').val().trim(), model.get('name'));
  assert.equal(this.$('.description input').val().trim(), model.get('description'));
  assert.equal(this.$('.code input').val().trim(), model.get('code'));
});
