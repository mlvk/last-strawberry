import Ember from 'ember';
import co from "npm:co";

export default Ember.Controller.extend({
  actions: {
    saveClient (client) {
      co(function *(){
        yield client.save();
        const cids = yield client.get('clientItemDesires');
        cids.forEach(cid => cid.save());

        const cvds = yield client.get('clientVisitDays');
        cvds.map(cvd => cvd.save());
      });
    },

    updateClientItemDesire ({item, cid}, desired) {
      const client = this.get('model');
      if (cid) {
        cid.set('desired', desired);
        cid.save();
      } else {
        const record = this.store.createRecord('client-item-desire', {item, client, desired});
        record.save();
      }
    },

    updateClientVisitDate ({day, cvd}, enabled) {
      const client = this.get('model');
      if (cvd) {
        cvd.set('enabled', enabled);
        cvd.save();
      } else {
        const record = this.store.createRecord('client-visit-day', {client, day, enabled});
        record.save();
      }
    },

    toggleActive (client, active) {
      client.set('active', active);
      client.save();
    }
  }
});
