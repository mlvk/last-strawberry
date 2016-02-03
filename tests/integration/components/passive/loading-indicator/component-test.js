import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('passive/loading-indicator', 'Integration | Component | passive/loading indicator', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{passive/loading-indicator}}`);

  assert.equal(this.$().text().trim(), 'Loading');
});
