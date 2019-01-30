import { helper as buildHelper } from '@ember/component/helper';

export function upper(strs) {
  return strs.map(str => str.toUpperCase());
}

export default buildHelper(upper);
