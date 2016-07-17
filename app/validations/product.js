import Ember from 'ember';
import config from 'last-strawberry/config/environment';
import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default function(session){
  function nameCheckValidator(key, value) {
    let hey;
    const yo = session.authorize('authorizer:devise', (headerName, headerValue) => {
      const headers = {};
      headers[headerName] = headerValue;

      const payload = {
        url:`${config.apiHost}/items/name_check`,
        data:{},
        headers,
        type:'POST'
      };

      hey = new Ember.RSVP.Promise(function(res, rej) {
        Ember.$.ajax(payload).always(response => res(response.valid) || res('No Son!'));
      })
    });
    return hey;
  }

  return {
    name: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],
    description: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],
    code: [
      validateLength({ min: 4 }),
      validatePresence(true)
    ]
  }
}
