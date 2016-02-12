import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui-label-checkbox'],
  classNameBindings: ['enabled'],

  enabled: Ember.computed.alias('model.enabled')
});
