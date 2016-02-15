import PO from 'last-strawberry/tests/page-object';

const { clickable, fillable, visitable, text, value, hasClass, collection } = PO;

const page = PO.create({
  visit: visitable('/companies/:company_id/locations/:location_id')
});

const itemDesiresPO = PO.create({
  items: collection({
    itemScope: '.item-desires .ui_label-checkbox',

    item: {
      label: text('.label'),
      enabled: hasClass('enabled')
    }
  })
});

const visitSchedulePO = PO.create({
  visitWindows: collection({
    itemScope: '.visit-schedule .visit-window'
  }),

  createNewVisitWindow: clickable('.visit-schedule .create-visit-window')
});

const visitDaysPO = PO.create({
  dayOptions: collection({
    itemScope: '.visit-schedule .visit-days .ui_label-checkbox',

    item: {
      label: text('.label'),
      enabled: hasClass('enabled')
    }
  })
});

const visitWindowPO = PO.create({

});

const addressPO = PO.create({
  createNewAddress: clickable('.location .createNewAddress'),

  fillStreet: fillable('.location .address .street'),
  fillCity: fillable('.location.address  .city'),
  fillState: fillable('.location.address  .state'),
  fillZip: fillable('.location.address  .zip'),
  fillLat: fillable('.location.address  .lat'),
  fillLon: fillable('.location.address  .lon'),

  street: value('.location .address .street'),
  city: value('.location .address .city'),
  state: value('.location .address .state'),
  zip: value('.location .address .zip'),
  lat: value('.location .address .lat'),
  lon: value('.location .address .lon')
});

export { page, itemDesiresPO, visitSchedulePO, visitDaysPO, visitWindowPO, addressPO };
