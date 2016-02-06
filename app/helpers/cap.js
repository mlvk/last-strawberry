import Ember from 'ember';

export function cap(strs) {
  return strs.map(str => str.capitalize());
}

export default Ember.Helper.helper(cap);
