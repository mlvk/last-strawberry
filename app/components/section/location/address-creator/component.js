import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['section_location_address-creator'],

  actions: {
    fieldChanged(field, e) {
      this.attrs.addressChanged(this.get('model'), field, e.target.value);
    }
  }
});
