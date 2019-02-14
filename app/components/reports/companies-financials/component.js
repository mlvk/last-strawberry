import Component from '@ember/component';
import { computed } from '@ember/object';

const CompaniesFinancials = Component.extend({
  classNames: ["row", "stretch", "card-1", "companies-financials"],

  totalVisits: computed("model", function() {
    const rawData = this.get("model");
    return _
      .flattenDeep(rawData
        .map(c => c.raw_data
          .map(l => l.raw_data)))
      .length;
  }),

  totalSales: computed("model", function() {
    const rawData = this.get("model");
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_sales_revenue);
      }, 0);
  }),

  totalDist: computed("model", function() {
    const rawData = this.get("model");
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_dist_revenue);
      }, 0);
  }),

  totalSpoilage: computed("model", function() {
    const rawData = this.get("model");
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_spoilage);
      }, 0);
  }),

  aveSalePerVisit: computed("totalSales", "totalDist", "totalSpoilage", "totalVisits", function() {
    const totalSales = this.get("totalSales");
    const totalDist = this.get("totalDist");
    const totalSpoilage = this.get("totalSpoilage");
    const totalVisits = this.get("totalVisits");
    return ((totalSales + totalDist) - totalSpoilage) / totalVisits;
  }),

  spoilageSalesRatio: computed("totalSales", "totalSpoilage", function() {
    const totalSales = this.get("totalSales");
    const totalSpoilage = this.get("totalSpoilage");
    return totalSpoilage / totalSales;
  })
});

export default CompaniesFinancials.reopenClass({
  positionalParams: ['model']
});
