import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: "col stretch",

  showInactive: false,
  filterTerm: "",

  @computed("items.@each.{active,name,code,position}", "filterTerm", "showInactive")
  filteredItems(items, query, showInactive){
    return items
      .sortBy("position")
      .filter(item => item.get("active") || showInactive)
      .filter(item => !item.get("isNew"))
      .filter(item => {
        const reg = new RegExp(query, "i");
        return reg.test(item.get("name")) || reg.test(item.get("code")) || reg.test(item.get("company.name"));
      });
  }
});
