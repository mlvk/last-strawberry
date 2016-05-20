import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('order', {
  default: {
    deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    location: FactoryGuy.belongsTo('location'),
    orderItems: FactoryGuy.hasMany('order-item')
  },

  sales_order: {
    orderType: 'sales-order'
  },

  purchase_order: {
    orderType: 'purchase-order'
  }
});
