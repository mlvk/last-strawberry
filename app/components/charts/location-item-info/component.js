import Ember from 'ember';
import computed from 'ember-computed-decorators';
const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'card-1'],

  firebaseMgr:      Ember.inject.service(),

  dataPathChanges:  new Rx.Subject(),
  hasData:          notEmpty('data'),

  @computed('data.timestamp')
  lastUpdated(timestamp) {
    return timestamp || moment().subtract(30, 'day');
  },

  didInsertElement() {
    this.subscription = this.dataPathChanges
      .map(dataPath => dataPath ? this.get('firebaseMgr.client').child(dataPath) : undefined)
      .scan((acc, current) => ({last:acc.current, current}), {})
      .subscribe(
        dto => this.processDataPathChange(dto),
        dto => this.removeFbListener(dto.current)
      );
  },

  didReceiveAttrs() {
    this.dataPathChanges.onNext(this.get('dataPath'));
  },

  willDestroyElement() {
    if(this.subscription) {
      this.subscription.dispose();
    }
  },

  processDataPathChange({current, last}) {
    this.set('loading', true);
    this.removeFbListener(last);
    this.addFbListener(current);
  },

  addFbListener(ref) {
    if(ref) {
      ref.on('value', this.processSnapshot, this.errorHander, this);
    }
  },

  removeFbListener(ref) {
    if(ref) {
      ref.off('value', this.processSnapshot, this);
    }
  },

  processSnapshot(snapshot) {
    this.set('loading', false);
    this.set('data', snapshot.val());
  },

  errorHander(/* msg */) {}
});
