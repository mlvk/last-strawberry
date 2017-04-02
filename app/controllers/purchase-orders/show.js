import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  alias,
  notEmpty
} = Ember.computed;

export default Ember.Controller.extend({
  hasDataPath: notEmpty("dataPath"),

  company: alias("model.location.company"),

  @computed("items.@each.{active}", "company.id")
  filteredItems(items, companyId) {

    return items
      .filter(item => {
        const isTheSameCompany = item.get("company.id") === companyId;

        return item.get("active") && isTheSameCompany;
      })
      .sortBy("name");
  },

  @computed("item.name", "model.location.id")
  dataPath(name, id) {
    if(name) {
      return `locations/${id}/${name}`;
    } else {
      return undefined;
    }
  },

  actions: {
    onOrderItemChange(item) {
      this.set("item", item);
    }
  }
});
