import DS from 'ember-data';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  routeVisit: belongsTo('route-visit'),
  order: DS.belongsTo('order')
});
