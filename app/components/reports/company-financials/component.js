import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  gt
} = Ember.computed;

const CompanyFinancials = Ember.Component.extend({
  classNames: ["company-financials"],
  @computed('model.raw_data.@each.{total_sales_revenue}')
  filteredLocationsFinancials(data) {
    return data
      .filter(l => Number(l.total_sales_revenue) > 0);
  },

  @computed('filteredLocationsFinancials.@each.{total_sales_revenue}')
  sortedFilteredLocationsFinancials(data) {
    return data
      .sort((a, b) => Number(b.total_sales_revenue) - Number(a.total_sales_revenue));
  },

  showLocationData: gt("sortedFilteredLocationsFinancials.length", 1)

});

export default CompanyFinancials.reopenClass({
  positionalParams: ['model']
});
