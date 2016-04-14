import Ember from 'ember';

export function cap(strs) {
  return strs
    .filter(str => !!str)
    .map(str => str
        .split(' ')
        .map(word => word.capitalize())
        .join(' '));
}

export default Ember.Helper.helper(cap);
