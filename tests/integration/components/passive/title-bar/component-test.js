import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('passive/title-bar', 'Integration | Component | passive/title bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{passive/title-bar}}`);

  this.set('title', 'test title')

  assert.equal(this.$('.title').text().trim(), 'test title');

});
