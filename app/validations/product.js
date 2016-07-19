import Ember from 'ember';
import config from 'last-strawberry/config/environment';
import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default function(session){
  function nameCheckValidator(key, newValue, oldValue, changes) {
    return new Ember.RSVP.Promise(res => {
      session.authorize('authorizer:devise', (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;

        const payload = {
          url:`${config.apiHost}/items/name_check`,
          data:{},
          headers,
          type:'POST'
        };

        Ember.$.ajax(payload)
          .always(response => {
            if(response.valid) {
              res(response.valid);
            } else {
              res('No Son!');
            }
        });
      });
    });
  }

  return {
    name: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],
    code: [
      nameCheckValidator,
      validatePresence(true)
    ],
    description: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ]
  }
}
