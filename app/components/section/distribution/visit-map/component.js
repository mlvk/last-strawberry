import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames:['row', 'stretch'],

  // Los Angeles defaults
  lat: 33.89891688437142,
  lng: -117.90527343750001,
  zoom: 10,

  @computed('routePlans.@each.{routeVisits}')
  handledRouteVisits(rps) {
    const rvs = rps
      .map(rp => rp.get('routeVisits')
          .map(rv => rv));

    return _.flatten(rvs);
  },

  @computed('handledRouteVisits')
  handledVisitWindowHashes(rvs) {
    return _.flatten(rvs.map(rv => rv.get('visitWindow.locationHash')));
  },

  @computed('visitWindows', 'handledVisitWindowHashes')
  openVisitWindows (visitWindows, handled) {
    return visitWindows.filter(vw => !handled.contains(vw.get('locationHash')));
  }
});
