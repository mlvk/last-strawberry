import Ember from 'ember';

export function minutesToTime(params) {
  return params.map(raw => {
    const hours = raw % 60;
    const minutes = raw - (hours * 60);
    return moment()
      .hours(hours)
      .minutes(minutes).format('hh:mm a');
  });
}

export default Ember.Helper.helper(minutesToTime);
