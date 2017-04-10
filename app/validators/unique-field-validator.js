import Ember from "ember";
import config from "last-strawberry/config/environment";

export default Ember.Object.extend({
  debounce: 500,
  isValid: true,
  whitelist: [],

  init() {
    this.subject = new Rx.Subject();

    this.subscription = this.subject
      .filter(value => !!value)
      .filter(value => this.get("whitelist").every(item => item !== value))
      .do(() => this.set("isValid", false))
      .debounce(this.get("debounce"))
      .flatMap(value => this.sendRequest(value))
      .subscribe(isValid => this.set("isValid", isValid));
  },

  destroy() {
    this.subscription.dispose();
    this.subject = undefined;
  },

  sendRequest(value){
    const data = {
      type: this.get("type"),
      key: this.get("key"),
      value
    }
    return Rx.Observable.defer(() => {
      return new Ember.RSVP.Promise(res => {
        const session = this.get("session");
        if(Ember.isEmpty(session)){
          return Ember.RSVP.reject("Need to set session before using");
        } else {
          session.authorize("authorizer:devise", (headerName, headerValue) => {
            const headers = {};
            headers[headerName] = headerValue;
            const payload = {
              url:`${config.apiHost}/custom/unique_check`,
              data,
              headers,
              type:"POST"
            };

            Ember.$
              .ajax(payload)
              .always(response => res(response.unique === "true" || response.unique === true));
          });
        }
      });
    });
  },

  validate(value, whitelist = []){
    this.set("whitelist", whitelist);
    this.subject.onNext(value);
  }
})
