import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  actions: {
    fieldChanged(field, value) {
      this.attrs.fieldChanged(this.get('model'), field, value);
    }
  }
});
