import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  location: belongsTo(),
  orderItems: hasMany()
});
