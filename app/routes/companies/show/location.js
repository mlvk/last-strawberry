import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const { run } = Ember;

const INCLUDES = [
  'address',
  'item-desires',
  'item-desires.item',
  'item-credit-rates',
  'item-credit-rates.item',
  'visit-days',
  'visit-windows',
  'visit-windows.visit-window-days'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('items', this.store.peekAll('item'));
  },

  model(params){
    return this.store.findRecord('location', params.location_id, {include:INCLUDES.join(',')});
  },

  afterModel(model) {
    const itemDesires = model.get('itemDesires');
    const itemCreditRates = model.get('itemCreditRates');

    const items = this.store.peekAll('item');

    items.forEach(item => {
      const matchingItemDesire = itemDesires.find(itemDesire => itemDesire.get('item.id') === item.get('id'));

      if(!matchingItemDesire) {
        const itemDesire = this.store.createRecord('item-desire', {location:model, item});
        model.get('itemDesires').pushObject(itemDesire);
      }

      const matchingItemCreditRate = itemCreditRates.find(itemCreditRate => itemCreditRate.get('item.id') === item.get('id'));
      if(!matchingItemCreditRate) {
        const itemCreditRate = this.store.createRecord('item-credit-rate', {location:model, item});
        model.get('itemCreditRates').pushObject(itemCreditRate);
      }
    });

    return model;
  },

  async _saveAddress() {
    const location = this.modelFor('companies.show.location');
    const address = await location.get('address');

    if(!address.get('isSaving')) {
      await address.save();
      location.save();
    }
  },

  actions: {

    updateItemDesire(itemDesire, enabled) {
      itemDesire.set('enabled', enabled);
      itemDesire.save();
    },

    updateItemCreditRate(itemCreditRate, rate) {
      itemCreditRate.set('rate', rate);
      itemCreditRate.save();

      // const location = this.modelFor('companies.show.location');
      // const itemDesires = location.get('itemDesires');
      //
      // source
      //   .map(({id, enabled}) => {
      //     const itemDesirePredicate = resource => resource.get('item.id') === id;
      //     const itemPredicate = resource => resource.get('id') === id;
      //     const item = this.store.peekAll('item').find(itemPredicate);
      //
      //     let match = itemDesires.find(itemDesirePredicate);
      //
      //     if(!match) {
      //       match = this.store.createRecord('item-desire', {item, location});
      //     }
      //
      //     match.set('enabled', enabled);
      //     return match;
      //   })
      //   .filter(itemDesire => itemDesire.get('hasDirtyAttributes'))
      //   .forEach(itemDesire => itemDesire.save());
      //
      // return this.modelFor('companies.show.location').get('itemDesires');
    },

    updateVisitDays(source) {
      const location = this.modelFor('companies.show.location');
      const visitDays = location.get('visitDays');

      source
        .map(({id, enabled}) => {
          const visitDayPredicate = resource => resource.get('day') === id;
          const day = id;

          let match = visitDays.find(visitDayPredicate);

          if(!match) {
            match = this.store.createRecord('visit-day', {location, day});
          }

          match.set('enabled', enabled);
          return match;
        })
        .filter(visitDay => visitDay.get('hasDirtyAttributes'))
        .forEach(visitDay => visitDay.save());

      return this.modelFor('companies.show.location').get('visitDays');
    },

    async visitWindowDaysChanged(visitWindow, newSelections) {
      await visitWindow.save();

      newSelections
        .map(({id, enabled}) => {
          const visitWindowDayPredicate = resource => resource.get('day') === id;
          const day = id;

          let match = visitWindow.get('visitWindowDays').find(visitWindowDayPredicate);

          if(!match) {
            match = this.store.createRecord('visit-window-day', {visitWindow, day});
          }

          match.set('enabled', enabled);
          return match;
        })
        .filter(visitWindowDay => visitWindowDay.get('hasDirtyAttributes'))
        .map(visitWindowDay => visitWindowDay.save());

      return this.modelFor('companies.show.location').get('visitWindows');
    },

    visitWindowChanged(model, attr, val) {
      console.log(attr, val);
      model.set(attr, val);
      model.save();
    },

    saveVisitWindow(model) {
      model.save();
    },

    createVisitWindow() {
      const location = this.modelFor('companies.show.location');
      this.store.createRecord('visit-window', {location});
    },

    fieldChanged(model, key, value) {
      model.set(key, value);
    },

    async saveLocation() {
      const location = this.modelFor('companies.show.location');
      this._saveRecord(location);
    },

    async updateAddress(newAddressData) {
      const location = this.modelFor('companies.show.location');
      let address = await location.get('address');

      if(!address) {
        address = this.store.createRecord('address');
        location.set('address', address);
      }

      address.setProperties(newAddressData);
      this._saveAddress();
    },

    saveAddress() {
      this._saveAddress();
    },

    async deleteLocation() {
      const location = this.modelFor('companies.show.location');
      if(!location.get('isDeleted')) {
        run(() => location.destroyRecord());
      }
    }

  }
});
