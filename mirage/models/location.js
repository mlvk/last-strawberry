import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  company: belongsTo(),
  address: belongsTo(),
  itemDesires: hasMany(),
  visitDays: hasMany()
});
