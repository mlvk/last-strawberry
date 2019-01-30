import { notEmpty, and } from '@ember/object/computed';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";
import { computed } from 'ember-decorators/object';
import PublishedState from "last-strawberry/constants/route-plan-states"

export default Model.extend({
  date:               attr("string"),
  publishedState:     attr("string", {defaultValue: PublishedState.PENDING}),

  user:               belongsTo("user"),
  routeVisits:        hasMany("route-visit"),

  @computed("routeVisits.@each.{position}")
  sortedRouteVisits(routeVisits) {
    return routeVisits.sortBy("position");
  },

  @computed("routeVisits.@each.{position,isValid,routePlanId}")
  sortedActiveRouteVisits(routeVisits) {
    return routeVisits
      .filter(rv => rv.get("routePlanId") === this.get("id"))
      .sortBy("position")
      .filter(rv => rv.get("isValid"));
  },

  @computed("date")
  formattedDate(date) {
    return moment(date, "YYYY-MM-DD").format("dddd, MMM Do - YYYY");
  },

  hasUser: notEmpty("user.id"),
  hasRouteVisits: notEmpty("routeVisits"),
  isValid: and("hasUser", "hasRouteVisits")
});
