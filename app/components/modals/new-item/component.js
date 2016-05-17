import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col'],

  didInsertElement() {
    this.$('.body .name').focus();
  },

  didReceiveAttrs() {
    const name = this.get('name');
    const company = this.get('company');
    this.set('formData', Ember.Object.create({name, company}));
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
