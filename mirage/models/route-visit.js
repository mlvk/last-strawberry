import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  routePlan: belongsTo(),
  location: belongsTo(),
  fulfillments: hasMany()
});
