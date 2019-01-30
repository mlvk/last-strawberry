import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

const FinancialRatios = Component.extend({
  classNames: ["col", "stretch"],

  @computed("model.{total_sales_revenue,total_dist_revenue}")
  totalGrossSales() {
    let sales = this.get("model.total_sales_revenue");
    let dist = this.get("model.total_dist_revenue");
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
