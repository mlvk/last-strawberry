import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames:['row', 'stretch'],
  lat: 33.89891688437142,
  lng: -117.90527343750001,
  zoom: 10,

  openIcon: L.divIcon({className: 'openLocations'}),
  takenLocations: L.divIcon({className: 'takenLocations', html: '<p>What</p>'}),

  @computed('routePlans.@each.{routeVisits}')
  handledVisitWindows(routePlans) {
    const rvs = routePlans
      .map(rp =>
        rp.get('routeVisits')
          .map(rv => rv.get('visitWindow')));

    return _.flatten(rvs);
  },

  @computed('visitWindows', 'handledVisitWindows')
  openVisitWindows (visitWindows, handled) {
    console.log(visitWindows, handled);
    return visitWindows.filter(vw => !handled.contains(vw));
  },

  actions: {
    what(e) {
      //
    }
  }

});
