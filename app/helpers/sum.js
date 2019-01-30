import { helper as buildHelper } from '@ember/component/helper';

export function sum(params) {
  let result = 0;
  if(params.length > 0){
    result = params.reduce((acc, cur) => acc + numeral(cur), 0);
  }

  return result;
}

export default buildHelper(sum);
