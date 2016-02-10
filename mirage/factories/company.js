import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.company.companyName(),
  code: i => `PREFIX-${i}`,
  credit_rate: 0.5,
  terms: 7,
  tag: 'customer'
});
