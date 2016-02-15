import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  enabled: () => faker.random.boolean()
});
