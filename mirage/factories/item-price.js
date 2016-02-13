import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  price:() => faker.commerce.price
});
