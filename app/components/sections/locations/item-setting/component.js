import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  actions: {
    creditRateChanged(e) {
      const rate = Number(e.target.value);
      this.attrs.onCreditChange(this.get('model.itemCreditRate'), rate);
    },

    toggle(enabled) {
      this.attrs.onDesireChange(this.get('model.itemDesire'), !this.get('model.itemDesire.enabled'));
    }
  }
});
