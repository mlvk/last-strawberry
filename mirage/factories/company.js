import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.company.companyName(),
  code: faker.company.suffixes(),
  credit_rate: 0.5,
  terms: 7,
  tag: 'customer'
});
