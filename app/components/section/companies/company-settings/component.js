import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [],

  actions: {
    fieldChanged(field, e) {
      this.attrs.fieldChanged(this.get('model'), field, e.target.value);
    }
  }
});
