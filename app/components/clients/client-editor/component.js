import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['uBorderP'],
  hasSelection: Ember.computed.notEmpty('model')
});
