import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  enabled: () => (_.random(0,1) === 1) ? true : false
});
