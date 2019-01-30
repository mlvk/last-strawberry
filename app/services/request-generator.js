import $ from 'jquery';
import { Promise } from 'rsvp';
import Service, { inject as service } from '@ember/service';
import config from 'last-strawberry/config/environment';

export default Service.extend({
  session: service(),

  send(type, url, data, headers = {}){
    return new Promise((res, rej) => {
      this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {

        const mergedHeaders = _.merge(headers, {[headerName]: headerValue });
        const options = {
          url:`${config.apiHost}/${url}`,
          data,
          headers: mergedHeaders,
          type
        };

        $.ajax(options)
          .fail(rej)
          .always(res);
      });
    });
  },

  postRequest(url, data, headers = {}){
    return this.send('POST', url, data, headers);
  },

  getRequest(url, headers = {}){
    return this.send('GET', url, {}, headers);
  }
});
