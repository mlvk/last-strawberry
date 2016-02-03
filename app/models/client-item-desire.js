import DS from 'ember-data';

export default DS.Model.extend({
  item: DS.belongsTo('item'),
  client: DS.belongsTo('client'),
  desired: DS.attr('boolean', {defaultValue: false})
});
