import PO from 'last-strawberry/tests/page-object';

const { visitable, text, hasClass, collection } = PO;

const page = PO.create({
  visit: visitable('/companies/:company_id/locations/:location_id')
});

const itemDesiresPO = PO.create({
  items: collection({
    itemScope: '.item-desires .ui-label-checkbox',

    item: {
      label: text('.label'),
      enabled: hasClass('enabled')
    }
  })
});

const visitDaysPO = PO.create({
  items: collection({
    itemScope: '.visit-days .ui-label-checkbox',

    item: {
      label: text('.label'),
      enabled: hasClass('enabled')
    }
  })
});

export { page, itemDesiresPO, visitDaysPO };
