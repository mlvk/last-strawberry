import Em from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';

export default DS.Model.extend({
  name: DS.attr('string'),
  template: DS.attr('boolean'),
  date: DS.attr('string'),
  user: DS.belongsTo('user'),
  routeVisits: DS.hasMany('route-visit'),

  sortAsc: ['position:asc'],
  sortedRouteVisits: Em.computed.sort('routeVisits', 'sortAsc'),

  @computed('date')
  formattedDate (date) {
    return moment(date, 'YYYY-MM-DD').format("dddd, MMM Do - YYYY");
  },

  @computed('routeVisits.@each.{locationHash}')
  hash(rvs) {
    return rvs.reduce((acc, cur) => acc + cur.get('locationHash'), '');
  },

  applyTranform (ot) {
    this._processRemoveTransform(ot);
    this._processAddTransform(ot);
  },

  consumeOrders (orders) {
    const remainingOrders = this.get('routeVisits').reduce((acc, rv) => rv.consumeOrders(acc), orders);
    this._clearInvalidVisits(orders);
    return remainingOrders;
  },

  _destroyVisit (routeVisit) {
    this.get('routeVisits').removeObject(routeVisit);
    routeVisit.destroyRecord();

    this.get('sortedRouteVisits').forEach((visit, i) => visit.set('position', i));
  },

  _removeVisits (routeVisits) {
    routeVisits.forEach(routeVisits => {
      this._destroyVisit(routeVisits);
    });
  },

  _processRemoveTransform (ot) {
    if(ot.fromRoutePlan === this) {
      this.get('routeVisits')
        .filter(rv => rv.get('locationHash') === ot.locationHash)
        .forEach(rv => this._destroyVisit(rv));
    }
  },

  _processAddTransform (ot) {
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

      if(Em.isEmpty(updated) || (Em.isNone(ot.belowLocationHash))){
        routeVisit.set('position', updated.length);
        updated.pushObject(routeVisit);
      }

      this.set('routeVisits', updated);
    }
  },

  _clearInvalidVisits (orders) {
    const allLocationHashes = orders
      .map(order => order.get('locationHash'))
      .filter(vw => vw !== undefined);

    const validLocationHashes = new Immutable.Set(allLocationHashes);
    const toDelete = this.get('routeVisits').filter(rv => !validLocationHashes.contains(rv.get('locationHash')));

    this._removeVisits(toDelete);
  }
});
