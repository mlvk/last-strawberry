import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['visit-window', 'col'],

  actions: {
    timeChanged(key, e) {
      const time = moment(e.target.value, 'hh:mm a');
      const minutes = time.minute() + (time.hour() * 60);
      this.attrs.onChange(this.get('model'), key, minutes);
    },

    serviceChanged(e) {
      this.attrs.onChange(this.get('model'), 'service', e.target.value);
    }
  }
});
