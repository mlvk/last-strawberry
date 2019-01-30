import Component from '@ember/component';

export default Component.extend({
  classNames: ['card-1'],

  triggerOpen(powerSelect) {
    const event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    powerSelect.dispatchEvent(event);
  },

  didInsertElement() {
    this._super(...arguments);
    const elm = this.$('.ember-power-select-trigger')[0];
    this.triggerOpen(elm);
  },

  actions: {
    onItemSelected(item) {
      this.get("onSubmit")(item);
      this.get("close")();
    }
  }
});
