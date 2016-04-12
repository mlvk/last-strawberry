import PO from 'last-strawberry/tests/page-object';

const { clickable, fillable, visitable, text, hasClass, collection } = PO;

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
  fillSearchAddress: fillable('.address-search input'),

  updateAddress: clickable('.address-search .submit'),

  fullAddress: text('.full-address')
});

export { page, itemDesiresPO, visitSchedulePO, visitDaysPO, visitWindowPO, addressPO };
