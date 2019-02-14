import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  session: service(),

  userName: computed('session.data.authenticated.{first_name,last_name}', function() {
    const first = this.get("session.data.authenticated.first_name") || "";
    const last = this.get("session.data.authenticated.last_name") || "";
    return `${S(first).capitalize().s} ${S(last).left(1).capitalize().s}.`;
  }),

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    login() {
      this.transitionToRoute('login');
    }
  }
});
