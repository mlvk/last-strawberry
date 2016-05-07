import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],
  classNameBindings: ['model.itemDesire.enabled:enabled:disabled'],

  @computed('index')
  indexFormatted(index){
    return index + 1;
  },

  @computed('model.itemCreditRate.rate')
  creditRate(rate) {
    if(typeof rate === "number") {
      return `${rate * 100} %`;
    } else {
      return '';
    }
  },

  actions: {
    creditRateChanged(e) {
      const rate = Number(e.target.value);
      this.attrs.onCreditChange(this.get('model.itemCreditRate'), rate);
    },

    toggle() {
      this.attrs.onDesireChange(this.get('model.itemDesire'), !this.get('model.itemDesire.enabled'));
    }
  }
});
