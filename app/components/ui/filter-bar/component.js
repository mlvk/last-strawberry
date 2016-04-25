import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onChange(e) {
      this.attrs.onChange(e.target.value);
    }
  }
});
