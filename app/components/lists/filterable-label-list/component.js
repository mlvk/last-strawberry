import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { get } from '@ember/object';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ['list-filterable-label-list', 'col', 'stretch'],
  items: sort("model", "sortName"),

  @computed("items.@each.{text}", "query")
  filteredItems(items, query) {
    return items
      .filter(item => {

        const reg = new RegExp(query, "i");
        return reg.test(get(item, "text"));
      });
  },

  init() {
    this._super(...arguments);

    this.sortName = ["text"];
  },

  actions: {
    filterItems(query) {
      this.set("query", query);
    }
  }
});
