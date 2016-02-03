import Ember from 'ember';

export default Ember.Mixin.create({
  expanded: false,
  actions: {
    toggle() {
      this.toggleProperty('expanded');
    }
  }
});
