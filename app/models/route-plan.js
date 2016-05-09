import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';
import colors from 'last-strawberry/constants/colors';

const { sort } = Ember.computed;
const { isNone, isEmpty } = Ember;

const colorSchemes = [
  {backgroundColor:colors.HOT_PINK, color:'white'},
  {backgroundColor:colors.DOPE_BLUE, color:'white'},
  {backgroundColor:colors.DARK_GREEN, color:'white'},
]

export default Model.extend({
  date:               attr('string'),

  user:               belongsTo('user'),
  routeVisits:        hasMany('route-visit'),

  @computed('routeVisits.@each.{position}')
  sortedRouteVisits(routeVisits) {
    return routeVisits.sortBy('position');
  },

  @computed('index')
  colorScheme(index) {
    return colorSchemes[index];
  },

  @computed('date')
  formattedDate(date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  }
});
