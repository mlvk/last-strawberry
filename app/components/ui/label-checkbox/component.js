import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui_label-checkbox'],
  classNameBindings: ['enabled'],

  enabled: Ember.computed.alias('model.enabled')
});
