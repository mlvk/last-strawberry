import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  drivers: filterBy("users", "isDriver", true)
});
