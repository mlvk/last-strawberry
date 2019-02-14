import $ from 'jquery';
import {
  create,
  clickable,
  collection,
  text,
  visitable } from "ember-cli-page-object";

export default create({
  visit: visitable("/distribution"),

  createRoutePlan: clickable(".debug_sections_distribution_tool-bar .add"),

  deleteRoutePlan(){
      $(".delete").click();
  },

  openRouteVisits: collection({
    itemScope: ".debug_sections_distribution_open-route-visits .debug_sections_distribution_route-visit",

    item: {
      title: text(".debug_passive_title-bar .span")
    }
  }),

  routePlans: collection({
    itemScope: ".debug_sections_distribution_route-plan",

    item: {
      routeVisits: collection({
        itemScope: ".debug_sections_distribution_route-visit",
        item: {
          title: text(".title"),
          delete: clickable(".action")
        }
      }),
      openSettingMenu: clickable(".settingMenu .trigger")
    }
  })
});
