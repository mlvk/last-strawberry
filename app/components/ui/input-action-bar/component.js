import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'ui_input-action-bar'],
  actions: {
    submit() {
      this.attrs.submit(this.get('inputValue'));
      this.set('inputValue', '');
    }
  }
});
