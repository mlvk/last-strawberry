import { page } from '../../../../pages/companies-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/visit-day');

test('renders correct url', function(assert) {
  authenticateSession(this.application);

  const company = server.schema.create('company');
  const location = company.createLocation();

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    assert.equal(currentURL(), `/companies/${company.id}/locations/${location.id}`);
  });
});
