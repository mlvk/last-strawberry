import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  @computed("fromDate", "toDate")
  isValid(fromDate, toDate) {
    return fromDate !== toDate && toDate !== undefined;
  },

  actions: {
    onToDateSelected(date) {
      this.set("toDate", moment(date).format("YYYY-MM-DD"));
    },

    submitDuplicateOrders() {
      return this
        .get("submit")(this.get("fromDate"), this.get("toDate"))
        .then(this.get("close"));
    }
  }
});
