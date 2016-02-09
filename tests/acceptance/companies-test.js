import page from '../pages/companies';
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
    assert.equal(page.companyCount, companies.length, 'Wrong num companies rendered');
  });
});

test('pending users can not view companies', function(assert) {
  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/login', 'Was not redirected to login');
  });
});
