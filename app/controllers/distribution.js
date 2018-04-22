import Ember from "ember";
import computed from "ember-computed-decorators";
import downloadFile from "last-strawberry/utils/download-file";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  pdfGenerator:   Ember.inject.service(),

  queryParams:    ["date"],
  date:           moment().add(1, "days").format("YYYY-MM-DD"),

  @computed("routePlans.@each.{date,isDeleted}", "date")
  activeRoutePlans(routePlans, date) {
    return routePlans
      .filter(rp => rp.get("date") === date)
      .filter(rp => !rp.get("isDeleted"));
  },

  activeRouteVisits: filterBy("routeVisits", "isValid", true),
  openRouteVisits: filterBy("activeRouteVisits", "isOpen", true),

  drivers: filterBy("users", "isDriver", true),

  actions: {
    async printFulfillmentDocuments() {
      const { url, key } = await this.get("pdfGenerator")
        .printFulfillmentDocuments(this.get("activeRoutePlans"));
      return downloadFile(url, key);
    },

    generateRoutePlanCSV() {
      const headers = ["", "Position", "Store Code", "Store Name", "Address", "State", "Zip", "Lat", "Lon", "In Time (mins)", "Out Time (mins)", "In Time", "Out Time", "Service Time"];
      const emptyArr = Array(headers.length).fill('');

      const data =
        this.get("activeRoutePlans")
          .toArray()
          .reduce((acc, cur) => {
            const routeData = Array(headers.length).fill('');
            routeData[0] = cur.get('user.name');

            const visitData = cur.get('sortedActiveRouteVisits')
              .map((rv, i)=> {
                const code = rv.get('location.code'),
                      name = rv.get('company.name'),
                      street = rv.get('address.street'),
                      state = rv.get('address.state'),
                      zip = rv.get('address.zip'),
                      lat = rv.get('lat'),
                      lng = rv.get('lng'),
                      min = rv.get('visitWindow.min'),
                      max = rv.get('visitWindow.max'),
                      minFormatted = rv.get('visitWindow.minFormatted'),
                      maxFormatted = rv.get('visitWindow.maxFormatted'),
                      service = rv.get('visitWindow.service');

                return ["", i + 1, code, name, street, state, zip, lat, lng, min, max, minFormatted, maxFormatted, service]
              });

            return R.concat(
              R.concat(acc,
                R.concat(R.concat([routeData], [headers]), [emptyArr])), R.concat(visitData, [emptyArr]));
          }, []);

      this.get('excel').export(data, {sheetName: 'MLVK - Sorted Visits', fileName: `${this.get('date')}.xlsx`});
    },

    onDateSelected(date) {
      this.set("date", moment(date).format("YYYY-MM-DD"));
    },

    selectRouteVisit(routeVisit) {
      if(this.get("selectedRouteVisit") !== routeVisit && routeVisit != null) {
        this.set("selectedRouteVisit", routeVisit);
      }
    },

    deSelectRouteVisit() {
      this.set("selectedRouteVisit", undefined);
    }
  }
});
