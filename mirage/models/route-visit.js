import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  routePlan: belongsTo(),
  order: belongsTo(),
  location: belongsTo()
});
