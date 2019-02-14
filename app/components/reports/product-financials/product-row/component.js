import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["row"],

  salesRatio: computed("model.total_sales", "totalSales", function() {
    const local = this.get("model.total_sales");
    const total = this.get("totalSales");
    return Number(local) / total;
  }),

  spoilageRatio: computed("model.total_spoilage", "totalSpoilage", function() {
    const local = this.get("model.total_spoilage");
    const total = this.get("totalSpoilage");
    return Number(local) / total;
  })

});
