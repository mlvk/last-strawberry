import Component from '@ember/component';

const LocationFinancials = Component.extend({
  classNames: ["row", "stretch"]
});

export default LocationFinancials.reopenClass({
  positionalParams: ['model']
});
