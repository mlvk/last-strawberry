import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  actions: {
    onFocusIn() {
      this.attrs.onFocusIn(this.get('model'));
    },

    onFocusOut() {
      this.attrs.onFocusOut(this.get('model'));
    }
  }

});
