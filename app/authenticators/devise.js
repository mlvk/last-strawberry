import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import config from 'last-strawberry/config/environment';

export default DeviseAuthenticator.extend({
  serverTokenEndpoint:`${config.apiHost}/users/sign_in`
});
