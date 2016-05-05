import PO from 'last-strawberry/tests/page-object';
// import { openDatepicker } from 'ember-pikaday/helpers/pikaday';
// import Ember from 'ember';

const {
  // clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;
//
// const datePickable = function datePickable(selector) {
//   return {
//     isDescriptor: true,
//
//     value(date) {
//
//       // debugger;
//       $(selector).trigger('fakeMe');
//
//
//       /* global fillIn */
//       // var interactor = openDatepicker($(selector));
//       // interactor.selectDate(date);
//
//       // triggerEvent(selector, 'fakeMe', 'something here');
//
//       return this;
//     }
//   }
// }



const page = PO.create({

  visit: visitable('/sales-orders'),

  locations: collection({
    itemScope: '.debug_sections_sales-orders_left-nav .child',

    item: {
      label: text('.label')
    }
  }),

  companies: collection({
    itemScope: '.debug_sections_sales-orders_left-nav .parent',

    item: {
      label: text('.label')
    }
  })

  // selectDate: datePickable('#datePicker')
});


export { page };
