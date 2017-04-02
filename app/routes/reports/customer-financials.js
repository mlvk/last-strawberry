import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),

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

    return new Ember.RSVP.Promise(res => {
      this.get("session").authorize("authorizer:devise", (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/reports/customer_financials_by_range`,
          data:{start_date:startDate, end_date:endDate},
          headers,
          type:"POST"
        };

        Ember.$
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
