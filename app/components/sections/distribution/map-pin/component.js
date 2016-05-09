import Ember from 'ember';

const { alias } = Ember.computed;

export default Ember.Component.extend({
  companyName: alias('model.address.locations.firstObject.company.name')
});
