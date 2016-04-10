import page from 'last-strawberry/tests/pages/companies';
import companyShowPO from 'last-strawberry/tests/pages/companies-show';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies');

test('admin can view companies', function(assert) {
  authenticateSession(this.application);
  const companies = server.createList('company', 10);

  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/companies');
    assert.equal(page.companies().count, companies.length, 'Wrong num companies rendered');
  });
});

test('pending users can not view companies', function(assert) {
  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/login', 'Was not redirected to login');
  });
});

test('admins can create new companies', function(assert) {
  authenticateSession(this.application);

  const newCompanyName = 'Nature Well';

  page
    .visit()
    .fillNewCompany(newCompanyName)
    .createNewCompany();

  andThen(function() {
    assert.equal(page.companies().count, 1, "Wrong number of companies rendered");
    assert.equal(companyShowPO.name, newCompanyName, "New company name didn't match");
  });
});
