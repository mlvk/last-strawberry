import Component from '@ember/component';
import { computed } from '@ember/object';

const CompaniesFinancials = Component.extend({
  classNames: ["row", "stretch", "card-1", "product-financials"],

  totalSales: computed("model.@each.{total_sales}", function() {
    const model = this.get("model");
    return model
      .reduce((acc, cur) => {
        return acc + Number(cur.total_sales);
      }, 0);
  }),

  totalSpoilage: computed("model.@each.{total_spoilage}", function() {
    const model = this.get("model");
    return model
      .reduce((acc, cur) => {
        return acc + Number(cur.total_spoilage);
      }, 0);
  })
});

export default CompaniesFinancials.reopenClass({
  positionalParams: ['model']
});
