import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  street: () => faker.address.streetAddress(),
  city: () => faker.address.city(),
  state: () => faker.address.state(),
  zip: () => faker.address.zipCode(),
  lat: () => faker.address.latitude(),
  lng: () => faker.address.longitude()
});
