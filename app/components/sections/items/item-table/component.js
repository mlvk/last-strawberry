import Ember from 'ember';

export default Ember.Component.extend({
  filteredItems: Ember.computed(function() {
    return this.get('items');
  })
});
