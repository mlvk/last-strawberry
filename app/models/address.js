import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend(LocationHashable, {
  street:       attr('string'),
  city:         attr('string'),
  state:        attr('string'),
  zip:          attr('string'),
  lat:          attr('number'),
  lng:          attr('number'),

  locations:    hasMany('location'),
  visitWindows: hasMany('visit-window'),
  routeVisits:  hasMany('route-visit'),

  @computed('street', 'city', 'state', 'zip')
  full(street, city, state, zip) {
    return `${street}, ${city}, ${state} ${zip}`;
  }
});
