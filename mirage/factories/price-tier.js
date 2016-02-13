import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name: (i) => faker.list.cycle('Distributor', 'Wholesale', 'Retail')(i)
});
