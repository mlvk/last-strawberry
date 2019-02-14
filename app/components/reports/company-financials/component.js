import Component from '@ember/component';
import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';

const CompanyFinancials = Component.extend({
  classNames: ["company-financials"],

  filteredLocationsFinancials: computed('model.raw_data.@each.{total_sales_revenue}', function() {
    const data = this.get("model.raw_data");
    return data
      .filter(l => Number(l.total_sales_revenue) > 0);
  }),

  sortedFilteredLocationsFinancials: computed('filteredLocationsFinancials.@each.{total_sales_revenue}', function() {
    const data = this.get("filteredLocationsFinancials");
    return data
      .sort((a, b) => Number(b.total_sales_revenue) - Number(a.total_sales_revenue));
  }),

  showLocationData: gt("sortedFilteredLocationsFinancials.length", 1)

});

export default CompanyFinancials.reopenClass({
  positionalParams: ['model']
});
