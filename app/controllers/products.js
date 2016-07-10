import Ember from 'ember';

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  products: filterBy('items', 'tag', 'product')
});
