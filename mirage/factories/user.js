import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName()
});
