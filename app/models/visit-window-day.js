import DS from 'ember-data';

export default DS.Model.extend({
  visitWindow: DS.belongsTo('visit-window'),
  day: DS.attr('number'),
  enabled: DS.attr('boolean')
});
