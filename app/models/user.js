import Em from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';

const { computed: { alias }} = Em;

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  routePlans: DS.hasMany('route-plan'),

  @computed('firstName', 'lastName')
  name(first, last) {
    return `${first} ${last}`
  },

  text: alias('name')

});
