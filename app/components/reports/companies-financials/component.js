import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

const CompaniesFinancials = Component.extend({
  classNames: ["row", "stretch", "card-1", "companies-financials"],

  @computed("model")
  totalVisits(rawData) {
    return _
      .flattenDeep(rawData
        .map(c => c.raw_data
          .map(l => l.raw_data)))
      .length;
  },

  @computed("model")
  totalSales(rawData) {
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_sales_revenue);
      }, 0);
  },

  @computed("model")
  totalDist(rawData) {
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_dist_revenue);
      }, 0);
  },

  @computed("model")
  totalSpoilage(rawData) {
    return rawData
      .reduce((acc, cur) => {
        return acc + Number(cur.total_spoilage);
      }, 0);
  },

  @computed("totalSales", "totalDist", "totalSpoilage", "totalVisits")
  aveSalePerVisit(totalSales, totalDist, totalSpoilage, totalVisits) {
    return ((totalSales + totalDist) - totalSpoilage) / totalVisits;
  },

  @computed("totalSales", "totalSpoilage")
  spoilageSalesRatio(totalSales, totalSpoilage) {
    return totalSpoilage / totalSales;
  }
});

export default CompaniesFinancials.reopenClass({
  positionalParams: ['model']
});
