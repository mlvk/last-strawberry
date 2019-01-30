import Component from '@ember/component';
import { computed } from 'ember-decorators/object';
import TemplateValidations from "last-strawberry/validators/route-plan-blueprint";

export default Component.extend({
  classNames: "col stretch",

  filterTerm: "",

  validators: TemplateValidations,

  @computed("routePlanBlueprints.@each.{name}", "filterTerm")
  filteredItems(routePlanBlueprints, query){
    return routePlanBlueprints
      .filter(rpb => {
        const reg = new RegExp(query, "i");
        return reg.test(rpb.get("name"));
      });
  }

});
