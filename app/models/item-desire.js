import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { alias } = Ember.computed;

export default Model.extend({
  enabled:    attr('boolean', { defaultValue: false }),

  item:       belongsTo('item'),
  location:   belongsTo('location'),

  text:       alias('item.name')
});
