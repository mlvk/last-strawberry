import Ember from 'ember';
import EnumModelsMixinMixin from '../../../mixins/enum-models-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | enum models mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var EnumModelsMixinObject = Ember.Object.extend(EnumModelsMixinMixin);
  var subject = EnumModelsMixinObject.create();
  assert.ok(subject);
});
