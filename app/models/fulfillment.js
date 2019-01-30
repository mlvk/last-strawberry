import { equal, bool } from '@ember/object/computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  deliveryState:      attr('string', {defaultValue:'pending'}),

  routeVisit:         belongsTo('route-visit'),
  order:              belongsTo('order'),

  isPending:          equal('deliveryState', 'pending'),
  isFulfilled:        bool('isPending')
});
