import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import UserValidations from "last-strawberry/validators/user";
import Roles from "last-strawberry/constants/roles";

export default Component.extend({
  session: service(),

  classNames: "col stretch",

  roles: _.values(Roles),

  filterTerm: "",

  validators: UserValidations,

  filteredUsers: computed("users.@each.{name,email}", "filterTerm", function(){
    const users = this.get("users");
    const query = this.get("filterTerm");
    return users
      .filter(user => {
        const reg = new RegExp(query, "i");
        return reg.test(user.get("name")) || reg.test(user.get("email"));
      });
  }),

  actions: {
    onRequestNewUser() {
      const stashedNewUserData = {
        role: Roles.PENDING
      }

      this.set("stashedNewUserData", stashedNewUserData);
      this.set("showNewUserModal", true);
    },

    closeNewUser() {
      this.set("showNewUserModal", false);
    },

    createNewUser(changeset){
      this.get("createNewUser")(changeset);
      this.set("showNewUserModal", false);
    }
  }
});
