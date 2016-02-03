import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames:['row', 'stretch', 'google-map'],

  didInsertElement () {
    this.map = new google.maps.Map(this.$('.mapContainer')[0], {
      center: {lat: 33.82954252303909, lng: -118.08108520507812},
      zoom: 10
    });
  },

  handledVisitWindows: Em.computed('routePlans.@each.routeVisits', function(){
    const handled = this.get('routePlans')
      .map(rp =>
        rp.get('routeVisits')
          .map(rv => rv.get('locationHash')));

    return Immutable.fromJS(handled).flatten().toSet();
  }),

  @computed('visitWindows.[]', 'handledVisitWindows')
  openVisitWindows (visitWindows, handled) {
    return visitWindows.filter(vw => !handled.contains(vw.get('locationHash')));
  },

  _clearMarkers () {
    if(this.markers){
      this.markers.forEach(marker => marker.setMap(null));
    }

    this.markers = new Immutable.List();
  },

  _createMarker (vw, options = { label:' ', color:'#dbdbdb', stroke:'#4f4f4f'}, rp) {
    const marker = new google.maps.Marker({
      position: {lat:vw.get('lat'), lng:vw.get('lon')},
      map: this.map,
      label: {
        text: String(options.label),
        color: 'black'
      },
      opacity: rp ? 1 : 1,

      icon: {
        path: 'M18.5-25.2C18.5-35.6,10.1-44-0.2-44S-19-35.6-19-25.2c0,6.9,3.7,12.8,9.2,16.1l9.3,9.3l8.8-8.8 \n C14.4-11.7,18.5-18,18.5-25.2z',
        scale: 0.8,
        fillColor: options.color,
        strokeColor: options.stroke,
        strokeWeight: 4,
        fillOpacity: 1,
        labelOrigin: new google.maps.Point(0, -25)
      }
    });

    this.markers = this.markers.push(marker);
  },

  _renderMarkers: Em.observer('openVisitWindows.[]', function(){
    Em.run.scheduleOnce('afterRender', this, () => {
      this._clearMarkers();
      this.get('openVisitWindows').forEach(vw => this._createMarker(vw));

      this.get('routePlans')
        .forEach(rp =>
          rp.get('routeVisits')
            .forEach((rv, i) => {
              this._createMarker(rv.get('visitWindow'), {label:i+1, color:'#ff50d2'}, rp)
            })
        );
    });
  }).on('init')

});
