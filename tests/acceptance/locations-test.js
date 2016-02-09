import page from '../pages/locations';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | locations');

test('visiting /locations', function(assert) {
  visit('/locations');

  andThen(function() {
    assert.equal(currentURL(), '/locations');
  });
});
