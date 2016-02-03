import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';

const { computed } = Em;

export default DS.Model.extend(LocationHashable, {
  routeVisit: computed(function(){
    this.throwImplError();
  }),

  deliveryDate: computed(function(){
    this.throwImplError();
  }),

  fullfilled: computed(function(){
    this.throwImplError();
  }),

  visitWindow: computed(function(){
    this.throwImplError();
  }),

  name: computed(function(){
    this.throwImplError();
  }),

  throwImplError () {
    throw new Error('This needs to be implemented in the super class');
  }
});
