import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import { get } from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['list-filterable-label-list', 'col', 'stretch'],
  items: sort("model", "sortName"),

  filteredItems: computed("items.@each.{text}", "query", function() {
    const items = this.get("items");
    const query = this.get("query");
    return items
      .filter(item => {

        const reg = new RegExp(query, "i");
        return reg.test(get(item, "text"));
      });
  }),

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
