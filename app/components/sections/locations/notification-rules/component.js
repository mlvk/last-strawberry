import Component from '@ember/component';
import NotificationValidations from "last-strawberry/validators/notification-rule";

export default Component.extend({
  NotificationValidations,

  actions:{
    saveNotification(changeset){
      if(changeset.get("isValid")){
        this.get("saveNotification")(changeset);
      }
    }
  }
});
