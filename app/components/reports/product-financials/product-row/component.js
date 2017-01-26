import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
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
