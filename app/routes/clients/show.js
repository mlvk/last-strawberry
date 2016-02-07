import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('enums', {items:this.store.peekAll('item')});
    this._super(controller, model);
  },

  model(params){
    return this.store.findRecord('client', params.id, {
      adapterOptions: {
        query: {
          include:'client-item-desires,client-item-desires.item,client-item-desires.client,client-visit-days,client-visit-days.client'
        }
      }
    });
  },

  actions: {
    updateVisitSchedule(newDays) {
      const client = this.currentModel;

      // Create missing records
      newDays.forEach(day => {
        let cvd = client.cvdForDay(day);
        if(!cvd)cvd = this.store.createRecord('client-visit-day', {client, day, enabled:true});
      });

      //Update records
      client.get('clientVisitDays')
        .forEach(cvd => {
          let enabled = newDays.contains(cvd.get('day'));
          if(cvd.get('enabled') !== enabled) {
            cvd.set('enabled', enabled);
          }

          cvd.set('enabled', enabled);
        })
        .filter(cvd => cvd.get('hasDirtyAttributes'))
        .forEach(cvd => cvd.save());
    },

    createVisitWindow() {
      const client = this.currentModel;

      const vw = this.store.createRecord('visit-window', {client});
      vw.save();
    }
  }


});
