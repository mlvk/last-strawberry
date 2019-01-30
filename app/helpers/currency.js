import { helper as buildHelper } from '@ember/component/helper';

export function currency(params) {
  if(params[0]){
    return numeral(params[0]).format('$0,0.00');
  } else {
    return '$0.00';
  }
}

export default buildHelper(currency);
