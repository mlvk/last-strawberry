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
  visit: visitable('/companies/:company_id/locations/:location_id'),

  fillStreet: fillable('.section_location_address-creator .street'),
  fillCity: fillable('.section_location_address-creator .city'),
  fillState: fillable('.section_location_address-creator .state'),
  fillZip: fillable('.section_location_address-creator .zip'),
  fillLat: fillable('.section_location_address-creator .lat'),
  fillLon: fillable('.section_location_address-creator .lon'),

  street: value('.section_location_address-creator .street'),
  city: value('.section_location_address-creator .city'),
  state: value('.section_location_address-creator .state'),
  zip: value('.section_location_address-creator .zip'),
  lat: value('.section_location_address-creator .lat'),
  lon: value('.section_location_address-creator .lon')
});

export { page, itemDesiresPO, visitSchedulePO, visitDaysPO, visitWindowPO, addressPO };
