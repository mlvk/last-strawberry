import { cap } from '../../../helpers/cap';
import { module, test } from 'qunit';

module('Unit | Helper | cap');

test('cap helper capitilizes', function(assert) {
  let result = cap(['hello', 'ho']);
  assert.equal(result[0], 'Hello');
  assert.equal(result[1], 'Ho');
});
