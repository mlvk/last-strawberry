import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  identification: 'admin@wutang.com',
  password: 'password',

  _processResult() {
    this.set('authenticating', false);
  },

  _processError(error) {
    this.set('authenticating', false);
    this.set('errorMessage', error.error)
  },

  actions: {
    authenticate() {
      this.set('errorMessage', undefined);
      this.set('authenticating', true);
      this.get('session')
        .authenticate('authenticator:devise', this.get('identification'), this.get('password'))
        .then(::this._processResult)
        .catch(::this._processError);
    }
  }
});
