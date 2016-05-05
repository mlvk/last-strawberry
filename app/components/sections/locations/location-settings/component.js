import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['section_location_location-settings', 'row'],

  actions: {
    fieldChanged(field, e) {
      this.attrs.fieldChanged(this.get('model'), field, e.target.value);
    }
  }
});
