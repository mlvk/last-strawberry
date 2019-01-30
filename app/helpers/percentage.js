import { helper as buildHelper } from '@ember/component/helper';

export function percentage(params) {
  const value = params[0];

  if(value){
    return numeral(value).format('0 %');
  } else {
    return '0 %';
  }
}

export default buildHelper(percentage);
