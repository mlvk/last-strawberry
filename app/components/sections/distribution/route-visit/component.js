import Ember from 'ember';
import style from 'last-strawberry/utils/styles';
import computed from 'ember-computed-decorators';

const { alias, gt } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  locations: alias('model.address.locations'),
  company: alias('model.address.locations.firstObject.company'),

  addressHasMultipleLocations: gt('locations.length', 1),

  @computed('company.name', 'locations.firstObject.id', 'addressHasMultipleLocations')
  title(companyName, locationId, hasMultiple) {
    console.log(companyName, locationId, hasMultiple);
    return hasMultiple ? `${companyName} - Multiple` : `${companyName} - ${locationId}`;
  },

  @style('colorScheme')
  textStyles(colorScheme = {color:this.get('colors').DARK_GREY}) {
    return {
      'color':colorScheme.color
    }
  },

  @computed('colorScheme')
  backgroundColor(colorScheme = {backgroundColor: this.get('colors').DARK_ORANGE}) {
    return colorScheme.backgroundColor;
  },

  actions: {
    removeRouteVisit() {
      if(this.attrs.removeRouteVisit) {
        this.attrs.removeRouteVisit(this.get('model'));
      }
    }
  }
});
