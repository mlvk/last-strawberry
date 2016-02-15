import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  visitWindowDays: hasMany(),
  location: belongsTo()
});
