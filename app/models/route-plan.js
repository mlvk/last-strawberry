import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import computed from 'ember-computed-decorators';
import colors from 'last-strawberry/constants/colors';

const { sort } = Ember.computed;
const { isNone, isEmpty } = Ember;

const colorSchemes = [
  {backgroundColor:colors.DARK_PINK, color:'white'},
  {backgroundColor:colors.DOPE_BLUE, color:'white'}
]

export default Model.extend({
  name:               attr('string'),
  template:           attr('boolean'),
  date:               attr('string'),

  user:               belongsTo('user'),
  routeVisits:        hasMany('route-visit'),

  sortedRouteVisits:  sort('routeVisits', () => ['position:asc']),

  @computed('index')
  colorScheme(index) {
    return colorSchemes[index];
  },

  @computed('date')
  formattedDate(date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  },

  // @computed('routeVisits.@each.{locationHash}')
  // hash(rvs) {
  //   return rvs.reduce((acc, cur) => acc + cur.get('locationHash'), '');
  // },

  applyTranform(ot) {
    this._processRemoveTransform(ot);
    this._processAddTransform(ot);
  },

  consumeOrders(orders) {
    const remainingOrders = this.get('routeVisits').reduce((acc, rv) => rv.consumeOrders(acc), orders);
    this._clearInvalidVisits(orders);
    return remainingOrders;
  },

  customDestroy() {
    this.get('routeVisits')
      .filter(rv => !!rv)
      .forEach(rv => rv.customDestroy());

    this.destroyRecord();
  },

  _destroyVisit(routeVisit) {
    routeVisit.customDestroy();
    this.get('routeVisits').removeObject(routeVisit);

    this.get('sortedRouteVisits').forEach((visit, i) => visit.set('position', i));
  },

  _removeVisits(routeVisits) {
    routeVisits.forEach(routeVisit => {
      this._destroyVisit(routeVisit);
    });
  },

  _processRemoveTransform(ot) {
    if(ot.fromRoutePlan === this) {
      this.get('routeVisits')
        .filter(rv => rv.get('locationHash') === ot.visitWindow.get('locationHash'))
        .forEach(rv => this._destroyVisit(rv));
    }
  },

  _processAddTransform(ot) {
    if(ot.toRoutePlan === this) {
      const collection = this.get('sortedRouteVisits');

      const routeVisit = this.store.createRecord('route-visit', {visitWindow: ot.visitWindow});

      const updated = collection.reduce((acc, rv) => {
        if(rv.get('locationHash') === ot.belowLocationHash){
          routeVisit.set('position', acc.length);
          acc.pushObject(routeVisit);
        }

        rv.set('position', acc.length);
        acc.pushObject(rv);
        return acc;
      }, []);

      if(isEmpty(updated) || (isNone(ot.belowLocationHash))){
        routeVisit.set('position', updated.length);
        updated.pushObject(routeVisit);
      }

      this.set('routeVisits', updated);
    }
  },

  _clearInvalidVisits(orders) {
    const allLocationHashes = orders
      .map(order => order.get('locationHash'))
      .filter(vw => vw !== undefined);

    const validLocationHashes = new Immutable.Set(allLocationHashes);
    const toDelete = this.get('routeVisits').filter(rv => !validLocationHashes.contains(rv.get('locationHash')));

    this._removeVisits(toDelete);
  }
});
