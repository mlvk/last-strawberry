import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';

export default Controller.extend({
  session: service(),

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
