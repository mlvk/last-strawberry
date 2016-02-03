import Em from 'ember';

export default Em.Component.extend({
  classNames: ['col'],

  sortAsc: ['client.code:asc'],
  sortedOrders: Em.computed.sort('model', 'sortAsc')
});
