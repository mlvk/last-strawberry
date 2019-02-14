import {
  create,
  collection,
  value,
  visitable,
  fillable,
  clickable } from "ember-cli-page-object";

export default create({
  visit: visitable("/route-plan-blueprints"),

  routePlanBlueprints: collection({
    itemScope: ".debug_sections_route-plan-blueprints_route-plan-blueprint-table_table-row",

    item: {
      name: value(".nameContainer input"),
      delete: clickable(".delete")
    }
  }),

  fillFilterInput: fillable(".filterTermInput")
});
