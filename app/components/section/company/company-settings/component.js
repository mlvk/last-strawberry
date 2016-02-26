import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['section_company_company-settings'],

  actions: {
    fieldChanged(field, e) {
      this.attrs.fieldChanged(this.get('model'), field, e.target.value);
    }
  }
});
