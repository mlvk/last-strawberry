import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isValid: computed("fromDate", "toDate", function() {
    const fromDate = this.get("fromDate");
    const toDate = this.get("toDate");
    return fromDate !== toDate && toDate !== undefined;
  }),

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
