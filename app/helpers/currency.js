import Ember from 'ember';

export function currency(params) {
  if(params[0]){
    return numeral(params[0]).format('$0,0.00');
  } else {
    return '$0.00';
  }
}

export default Ember.Helper.helper(currency);
