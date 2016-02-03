import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  @computed('session.data.authenticated.{first_name,last_name}')
  userName(first = "", last = "") {
    return `${S(first).capitalize().s} ${S(last).left(1).capitalize().s}.`;
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    login() {
      this.transitionToRoute('login');
    }
  }
});
