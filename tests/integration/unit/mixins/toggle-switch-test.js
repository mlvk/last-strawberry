import Ember from 'ember';
import ToggleSwitchMixin from '../../../mixins/toggle-switch';
import { module, test } from 'qunit';

module('Unit | Mixin | toggle switch');

// Replace this with your real tests.
test('it works', function(assert) {
  var ToggleSwitchObject = Ember.Object.extend(ToggleSwitchMixin);
  var subject = ToggleSwitchObject.create();
  assert.ok(subject);
});
