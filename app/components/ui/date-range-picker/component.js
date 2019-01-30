import Component from '@ember/component';

export default Component.extend({
  classNames: ["row"],
  actions: {
    onStartDateSelected(date) {
      this.set("stashedStartDate", moment(date).format("YYYY-MM-DD"));
    },

    onEndDateSelected(date) {
      this.set("stashedEndDate", moment(date).format("YYYY-MM-DD"));
    },

    generateReport() {
      this.get("onDatesConfirmed")(this.get("stashedStartDate"), this.get("stashedEndDate"));
    }
  }
});
