import page from 'last-strawberry/tests/pages/companies-show';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { make, makeList, mockDelete, mockQueryRecord, mockFind, mockFindAll } from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | locations');

test('renders locations', function(assert) {
  authenticateSession(this.application);

  const companies = makeList('company', 1);
  const company = companies[0];
  mockFindAll('company').returns({models:companies});

  mockFind('company').returns({model:company});

  const locations = makeList('location', 10, {company});

  page.visit({id:company.get('id')});

  andThen(function() {
    assert.equal(currentURL(), `/companies/${company.get('id')}`);
    assert.equal(page.locationCount, locations.length);

    assert.equal(page.name, company.get('name'), 'Company name not rendered correctly');
  });
});
