import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  enabled: () => faker.random.boolean(),
  min: 400,
  max: 700,
  service: 15
});
