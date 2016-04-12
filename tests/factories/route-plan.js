import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('route-plan', {
  default: {
    date: moment().add(1, 'days').format('YYYY-MM-DD'),
    routeVisits: FactoryGuy.hasMany('route-visit'),
    user: FactoryGuy.belongsTo('user')
  }
});
