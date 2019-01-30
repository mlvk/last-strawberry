import { helper as buildHelper } from '@ember/component/helper';

export function date(params) {
  if(params[0]){
    return moment(params[0]).toDate();
  } else {
    return moment().toDate();
  }
}

export default buildHelper(date);
