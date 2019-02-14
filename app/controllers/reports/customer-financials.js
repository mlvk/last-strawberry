import Controller from '@ember/controller';
import { computed } from '@ember/object';

const START_OF_THIS_MONTH = moment(1, "DD");
const END_OF_THIS_MONTH = moment(1, "DD").endOf("month");

export default Controller.extend({
  startDate: START_OF_THIS_MONTH.format("YYYY-MM-DD"),
  endDate: END_OF_THIS_MONTH.format("YYYY-MM-DD"),

  filteredCompaniesFinancials: computed('model.report_data.@each.{total_sales_revenue}', function() {
    const data = this.get("model.report_data");
    return data
      .filter(c => Number(c.total_sales_revenue) > 0);
  }),

  sortedFilteredCompaniesFinancials: computed('filteredCompaniesFinancials.@each.{total_sales_revenue}', function() {
    const data = this.get("filteredCompaniesFinancials");
    return data
      .sort((a, b) => Number(b.total_sales_revenue) - Number(a.total_sales_revenue));
  })
});
