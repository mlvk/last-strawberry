import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { bool, equal } = Ember.computed;

export default Model.extend({
  deliveryState:      attr('string', {defaultValue:'pending'}),

  routeVisit:         belongsTo('route-visit'),
  order:              belongsTo('order'),

  isPending:          equal('deliveryState', 'pending'),
  isFulfilled:        bool('isPending')
});
