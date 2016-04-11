import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {
    firstName: () => FactoryGuy.generate(num => `first name ${num}`),
    lastName: () => FactoryGuy.generate(num => `last name ${num}`),
    role: 'pending'
  },

  traits: {
      admin: { role: 'admin' },
      driver: { role: 'driver' },
      accountant: { role: 'accountant' }
    }
});
