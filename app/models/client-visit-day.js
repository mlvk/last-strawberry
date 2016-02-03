import DS from 'ember-data';

export default DS.Model.extend({
  client: DS.belongsTo('client'),
  day: DS.attr('number'),
  enabled: DS.attr('boolean')
});
