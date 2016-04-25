import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/date-picker', 'Integration | Component | ui/date picker', {
  integration: true
});

test('it renders the correct date when passed date attribute', function(assert) {
  this.set('date', Date.parse('01/21/1981'));
  this.set('format', 'MM-DD-YYYY');
  this.set('onSelected', () =>{});
  this.render(hbs`{{ui/date-picker
    date=date
    format=format
    onSelected=(action onSelected)}}`);

  assert.equal(this.$('input').val().trim(), '01-21-1981');
});
