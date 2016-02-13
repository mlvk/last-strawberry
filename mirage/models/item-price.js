import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  priceTier: belongsTo(),
  item: belongsTo()
});
