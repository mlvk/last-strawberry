import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  price:      attr('number'),

  item:       belongsTo('item'),
  priceTier:  belongsTo('price-tier')
});
