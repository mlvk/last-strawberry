import Ember from 'ember';
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],

  companyQuery: '',

  @computed("locations", "companyQuery")
  groupedLocations(locations, companyQuery) {
    const reg = new RegExp(companyQuery, "i");

    return  _
      .chain(locations.toArray())
      .filter(location => reg.test(location.get("company.name")))
      .sortBy(location => location.get("company.name"))
      .groupBy(location => location.get("company.name"))
      .value();
  }
});
