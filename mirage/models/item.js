import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  itemDesires: hasMany(),
  orderItems: hasMany()
});
