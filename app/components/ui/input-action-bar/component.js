import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'ui_input-action-bar'],
  didInsertElement() {
    if(this.get('autoFocus')){
      this.$('input').focus();
    }
  },
  actions: {
    submit() {
      this.attrs.submit(this.get('inputValue'));
      this.set('inputValue', '');
    }
  }
});
