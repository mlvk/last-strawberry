import { helper as buildHelper } from '@ember/component/helper';

export function cap(strs) {
  return strs
    .filter(str => !!str)
    .map(str => str
        .split(' ')
        .map(word => word.capitalize())
        .join(' '));
}

export default buildHelper(cap);
