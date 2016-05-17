import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/order-editor/notification-status', 'Integration | Component | ui/order editor/notification status', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/order-editor/notification-status}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/order-editor/notification-status}}
      template block text
    {{/ui/order-editor/notification-status}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
