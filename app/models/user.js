import Em from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';

const { computed: { alias }} = Em;
const { attr, hasMany } = DS;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  phone: attr('string'),
  email: attr('string'),
  routePlans: hasMany('route-plan'),
  role: attr('string', {defaultValue:'pending'}),

  @computed('firstName', 'lastName')
  name(first, last) {
    return `${first} ${last}`
  },

  text: alias('name')

});
