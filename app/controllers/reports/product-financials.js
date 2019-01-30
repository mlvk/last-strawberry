import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';

const START_OF_THIS_MONTH = moment(1, "DD");
const END_OF_THIS_MONTH = moment(1, "DD").endOf("month");

export default Controller.extend({
  startDate: START_OF_THIS_MONTH.format("YYYY-MM-DD"),
  endDate: END_OF_THIS_MONTH.format("YYYY-MM-DD"),

  @computed("model.report_data.@each.{total_sales}")
  sortedProductFinancials(data) {
    return data
      .sort((a, b) => Number(b.total_sales) - Number(a.total_sales));
  }
});
