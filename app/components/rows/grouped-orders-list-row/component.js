import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    this.attrs.onSelect(this.get('model'))
  }
});
