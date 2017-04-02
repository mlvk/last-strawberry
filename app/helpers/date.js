import Ember from 'ember';

export function date(params) {
  if(params[0]){
    return moment(params[0]).toDate();
  } else {
    return moment().toDate();
  }
}

export default Ember.Helper.helper(date);
