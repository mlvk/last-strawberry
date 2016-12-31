import Ember from 'ember';
import computed from 'ember-computed-decorators';

const FinancialRatios = Ember.Component.extend({
  classNames: ["col", "stretch"],

  @computed("model.total_sales_revenue", "model.total_dist_revenue")
  totalGrossSales(sales, dist) {
    return Number(sales) + Number(dist);
  },

  @computed("totalGrossSales", "model.total_spoilage")
  totalNetSales(sales, spoilage) {
    return sales - Number(spoilage);
  },

  @computed("totalGrossSales", "model.total_spoilage")
  grossMargin(totalGrossSales, spoilage) {
    return (1 - Number(spoilage) / totalGrossSales);
  },

  @computed("model.raw_data.[]")
  totalVisits(rawData) {
    return _
      .flattenDeep(rawData.map(l => l.raw_data))
      .length;
  },

  @computed("totalSales", "totalGrossSales")
  percOfTotalSales(total, local) {
    return local/total;
  },

  @computed("totalNetSales", "totalVisits")
  aveCostPerVisit(totalNetSales, totalVisits) {
    return totalNetSales/totalVisits;
  }
});

export default FinancialRatios.reopenClass({
  positionalParams: ['model']
});
