import Component from '@ember/component';

export default Component.extend({
  classNames: ['row'],

  actions: {
    fieldChanged(field, value) {
      this.get("fieldChanged")(this.get('model'), field, value);
    }
  }
});
