import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames:['row', 'stretch'],

  // Los Angeles defaults
  lat: 33.89891688437142,
  lng: -117.90527343750001,
  zoom: 10,

  @computed('routeVisits.@each.{isOrphan,position}')
  openRouteVisits(routeVisits) {
    return routeVisits.filter(rv => rv.get('isOrphan'));
  },

  @computed('routeVisits.@each.{isOrphan,position}')
  handledRouteVisits(routeVisits) {
    return routeVisits.filter(rv => !rv.get('isOrphan'));
  },

  @computed('handledRouteVisits')
  handledRouteVisitsNormalized(routeVisits) {
    return _.chain(routeVisits)
      .groupBy(rv => rv.get('routePlan.id'))
      .map(group =>
        group
          .sortBy('position')
          .map((rv, index) => ({rv, index})))
          .flatten()
          .value();
  }
});
