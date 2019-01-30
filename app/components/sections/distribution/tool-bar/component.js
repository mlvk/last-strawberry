import Component from '@ember/component';
import { notEmpty, and } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ["row"],
  currentSelectedRoutePlanTemplate: undefined,

  @computed("routePlans.@each.{isValid}")
  allPlansValid(routePlans = []){
    return routePlans.every(rp => rp.get("isValid"));
  },

  hasRoutePlanTemplates:          notEmpty("routePlanBlueprints"),
  hasRoutePlans:                  notEmpty('routePlans'),
  canPrintDistributionDocuments:  and("hasRoutePlans", "allPlansValid"),

  actions: {
    handleCreateRoutePlan() {
      if(!this.get("disabled")){
        this.get("createRoutePlan")();
      }
    },

    selectRouteTemplate(template) {
      this.set("currentSelectedRoutePlanTemplate", undefined);
      this.get("applyTemplate")(template);
    }
  }
});
