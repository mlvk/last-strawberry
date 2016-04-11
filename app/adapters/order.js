import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  deleteRecord(store, type, snapshot) {
    return this._super(store, type, snapshot)
      .then(() => snapshot.hasMany('orderItems').forEach(s => s.record.unloadRecord()));
  }
});
