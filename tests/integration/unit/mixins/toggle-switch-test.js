import EmberObject from '@ember/object';
import ToggleSwitchMixin from 'last-strawberry/mixins/toggle-switch';
import { module, test } from 'qunit';

module('Unit | Mixin | toggle switch');

// Replace this with your real tests.
test('it works', function(assert) {
  var ToggleSwitchObject = EmberObject.extend(ToggleSwitchMixin);
  var subject = ToggleSwitchObject.create();
  assert.ok(subject);
});
