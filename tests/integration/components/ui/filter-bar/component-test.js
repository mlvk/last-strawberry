import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/filter-bar', 'Integration | Component | ui/filter bar', {
  integration: true
});

test('it triggers onChange action on input', function(assert) {
  assert.expect(1);

  const inputContent = "Earthbar";

  this.on('onChange', val => assert.equal(val, inputContent));
  this.render(hbs`{{ui/filter-bar
    placeholder='filter'
    onChange=(action 'onChange')}}`);

  this.$('input').val(inputContent);
  this.$('input').change();
});
