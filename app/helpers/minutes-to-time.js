import { helper as buildHelper } from '@ember/component/helper';
import { minutesToTime } from 'last-strawberry/utils/time';

export function helper(params) {
  return params.map(minutesToTime);
}

export default buildHelper(helper);
