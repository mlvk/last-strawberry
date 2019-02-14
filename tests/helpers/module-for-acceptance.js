import { module } from 'qunit';
import startApp from '../helpers/start-app';
import { mockSetup, mockTeardown, getPretender } from 'ember-data-factory-guy';
import destroyApp from '../helpers/destroy-app';
import preferencesMock from '../mocks/preferences-service';
import { resolve } from 'rsvp';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {

      this.application = startApp();

      // Mock preferencesService
      this.application.register('service:mockPreferences', preferencesMock);
      this.application.inject('component', 'preferencesService', 'service:mockPreferences');

      getPretender().post('https://andruxnet-random-famous-quotes.p.mashape.com/*', () => {
        let quotes =  JSON.stringify({"quote":"Houston, we have a problem.","author":"Apollo 13","category":"Movies"});
        return [200, {}, quotes]
      });
      getPretender().get('https://api.mapbox.com/*', () => [200, {}, ""]);

      mockSetup();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },
    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach)
        .then(() => destroyApp(this.application))
        .then(() => mockTeardown());
    }
  });
}
