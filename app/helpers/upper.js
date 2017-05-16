import Ember from 'ember';

export function upper(strs) {
  return strs.map(str => str.toUpperCase());
}

export default Ember.Helper.helper(upper);
