import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
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
