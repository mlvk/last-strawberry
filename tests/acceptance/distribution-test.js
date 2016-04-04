import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | distribution');

test('visiting distribution defaults to tomorrows date', function(assert) {
  authenticateSession(this.application);

  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

  visit(`/distribution?date=${tomorrow}`);

  andThen(function() {
    assert.equal(currentURL(), `/distribution?date=${tomorrow}`);
  });
});
