import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';
import { toPercentage } from 'last-strawberry/utils/math';

export default Component.extend({
  classNames: ['row', 'stretch'],
  classNameBindings: ['model.itemDesire.enabled:enabled:disabled'],

  @computed('index')
  indexFormatted(index){
    return index + 1;
  },

  creditRate: alias('model.itemCreditRate.rate'),

  actions: {
    creditRateChanged(e) {
      this.get("onCreditChange")(this.get('model.itemCreditRate'), toPercentage(e.target.value));
    },

    toggle() {
      this.get("onDesireChange")(this.get('model.itemDesire'), !this.get('model.itemDesire.enabled'));
    }
  }
});
