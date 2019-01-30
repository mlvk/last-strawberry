import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ["row"],

  @computed("model.total_sales", "totalSales")
  salesRatio(local, total) {
    return Number(local) / total;
  },

  @computed("model.total_spoilage", "totalSpoilage")
  spoilageRatio(local, total) {
    return Number(local) / total;
  }

});
