import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-1'],

  triggerOpen(powerSelect) {
    const event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    powerSelect.dispatchEvent(event);
  },

  didRender() {
    const elm = this.$('.ember-power-select-trigger')[0];
    this.triggerOpen(elm);
  },

  actions: {
    foo() {
      this.attrs.close();
      console.log('called');
    },

    onItemSelected(item) {
      this.attrs.onSubmit(item);
      this.attrs.close();
    }
  }
});
