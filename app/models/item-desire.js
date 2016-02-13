import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  item: DS.belongsTo('item'),
  location: DS.belongsTo('location'),
  enabled: DS.attr('boolean', {defaultValue: false}),

  text: Ember.computed.alias('item.name')
});
