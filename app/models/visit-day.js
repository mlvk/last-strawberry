import DS from 'ember-data';

export default DS.Model.extend({
  location: DS.belongsTo('location'),
  day: DS.attr('number'),
  enabled: DS.attr('boolean')
});
