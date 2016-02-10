import page from '../pages/companies-show';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | locations');

test('renders locations', function(assert) {
  authenticateSession(this.application);
  const company = server.create('company');
  const locations = server.createList('location', 10, {companyId: company.id});

  page.visit({id:company.id});

  andThen(function() {
    assert.equal(currentURL(), `/companies/${company.id}`);
    assert.equal(page.locationCount, locations.length);

    assert.equal(page.name, company.name, 'Company name not rendered correctly');
  });
});
