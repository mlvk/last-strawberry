import Ember from 'ember';

const LocationFinancials = Ember.Component.extend({
  classNames: ["row", "stretch"]
});

export default LocationFinancials.reopenClass({
  positionalParams: ['model']
});
