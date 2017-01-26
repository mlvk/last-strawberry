import Ember from "ember";
import computed from "ember-computed-decorators";

const START_OF_THIS_MONTH = moment(1, "DD");
const END_OF_THIS_MONTH = moment(1, "DD").endOf("month");

export default Ember.Controller.extend({
  startDate: START_OF_THIS_MONTH.format("YYYY-MM-DD"),
  endDate: END_OF_THIS_MONTH.format("YYYY-MM-DD"),

  @computed("model.report_data.@each.{total_sales}")
  sortedProductFinancials(data) {
    return data
      .sort((a, b) => Number(b.total_sales) - Number(a.total_sales));
  }
});
