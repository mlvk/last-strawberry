import $ from 'jquery';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import config from 'last-strawberry/config/environment';

export default Route.extend({
  session: service(),

  queryParams: {
    startDate: {
      refreshModel: true
    },
    endDate: {
      refreshModel: true
    }
  },

  model() {
    const startDate = this.paramsFor("reports.customer-financials").startDate;
    const endDate = this.paramsFor("reports.customer-financials").endDate;

    return new Promise(res => {
      this.get("session").authorize("authorizer:devise", (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/reports/customer_financials_by_range`,
          data:{start_date:startDate, end_date:endDate},
          headers,
          type:"POST"
        };

        $
          .ajax(payload)
          .then(data => res(data));
      });
    });
  },

  actions: {
    onDatesConfirmed(startDate, endDate) {
      this.controllerFor("reports.customer-financials").set("startDate", startDate);
      this.controllerFor("reports.customer-financials").set("endDate", endDate);
    }
  }
});
