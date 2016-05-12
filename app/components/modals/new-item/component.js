import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col'],

  formData: Ember.Object.create(),

  didInsertElement() {
    this.$('.body .name').focus();
  },

  didReceiveAttrs() {
    const name = this.get('name');
    const company = this.get('company');
    this.get('formData').setProperties({name, company});
  },

  actions: {
    fieldChanged(key, e) {
      this.get('formData').set(key, e.target.value);
    },

    submitForm() {
      this.attrs.submit(this.get('formData'));
    }
  }
});
