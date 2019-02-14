import Component from '@ember/component';
import { computed } from '@ember/object';

const FinancialRatios = Component.extend({
  classNames: ["col", "stretch"],

  totalGrossSales: computed("model.{total_sales_revenue,total_dist_revenue}", function() {
    const sales = this.get("model.total_sales_revenue");
    const dist = this.get("model.total_dist_revenue");
    return Number(sales) + Number(dist);
  }),

  totalNetSales: computed("totalGrossSales", "model.total_spoilage", function() {
    const sales = this.get("totalGrossSales");
    const spoilage = this.get("model.total_spoilage");
    return sales - Number(spoilage);
  }),

  grossMargin: computed("totalGrossSales", "model.total_spoilage", function() {
    const totalGrossSales = this.get("totalGrossSales");
    const spoilage = this.get("model.total_spoilage");
    return (1 - Number(spoilage) / totalGrossSales);
  }),

  totalVisits: computed("model.raw_data.[]", function() {
    const rawData = this.get("model.raw_data");
    return _
      .flattenDeep(rawData.map(l => l.raw_data))
      .length;
  }),

  percOfTotalSales: computed("totalSales", "totalGrossSales", function() {
    const total = this.get("totalSales");
    const local = this.get("totalGrossSales");
    return local/total;
  }),

  aveCostPerVisit: computed("totalNetSales", "totalVisits", function() {
    const totalNetSales = this.get("totalNetSales");
    const totalVisits = this.get("totalVisits");
    return totalNetSales/totalVisits;
  })
});

export default FinancialRatios.reopenClass({
  positionalParams: ['model']
});
