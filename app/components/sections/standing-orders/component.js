import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['row', 'stretch'],

  companyQuery: '',

  groupedLocations: computed("locations", "companyQuery", function() {
    const locations = this.get("locations");
    const companyQuery = this.get("companyQuery");
    const reg = new RegExp(companyQuery, "i");

    return  _
      .chain(locations.toArray())
      .filter(location => reg.test(location.get("company.name")))
      .sortBy(location => location.get("company.name"))
      .groupBy(location => location.get("company.name"))
      .value();
  })
});
