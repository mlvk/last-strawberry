import Ember from 'ember';
import computed from "ember-computed-decorators";

const { filterBy, sort } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'stretch'],

  validLineItems: filterBy('model.orderTemplateItems', 'isDeleted', false),

  positionSort: ['position'],
  sortedValidLineItems: sort('validLineItems', 'positionSort'),

  products: filterBy('items', 'isSold', true),
  activeProducts: filterBy('products', 'active', true),

  @computed('model.startDate', 'model.frequency', 'model.orderTemplateDays.@each.{enabled}')
  sampleDates(date, freq, days) {
    return days
      .toArray()
      .filter(day => day.get('enabled'))
      .map(day => moment(date).add(freq-1, 'w').add(day.get('day'), 'd').format('ddd MM-DD'));
  }
});
