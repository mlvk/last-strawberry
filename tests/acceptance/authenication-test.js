import page from '../pages/login';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | authenication');

test('users can log in', function(assert) {
  page
    .visit()
    .username('ts@wutang.com')
    .password('password')
    .submit();

  andThen(function() {
    assert.equal(currentURL(), '/orders');
  });
});
