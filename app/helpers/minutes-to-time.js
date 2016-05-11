import Ember from 'ember';

export function minutesToTime(params) {
  return params.map(raw => {
    const hours = raw % 60;
    const minutes = raw - (hours * 60);

    if(_.isFinite(hours) && _.isFinite(minutes)) {
      return moment()
        .hours(hours)
        .minutes(minutes).format('hh:mma');
    } else {
      return '';
    }

  });
}

export default Ember.Helper.helper(minutesToTime);
