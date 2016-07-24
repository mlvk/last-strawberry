import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy } = Ember.computed;

export default Ember.Component.extend({

  classNames: 'col stretch',

  ingredients: filterBy('items', 'tag', 'ingredient'),
  showInactive: false,
  filterTerm: '',

  hasMatch(item, query) {
    const reg = new RegExp(query, 'i');
    return reg.test(item.get('name')) || reg.test(item.get('code')) || reg.test(item.get('company.name'));
  },

  @computed('ingredients', 'filterTerm', 'showInactive')
  filteredItems(items, query, showInactive){
    return items
      .filter(item => item.get('active') || showInactive)
      .filter(item => this.hasMatch(item, query));
  }
});
