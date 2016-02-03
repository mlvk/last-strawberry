import Ember from 'ember';

export default Ember.Mixin.create({
  locationHash: Ember.computed('visitWindow', function(){
    const vw = this.get('visitWindow');
    if (Ember.isPresent(vw)) {
      return `~${vw.get('lat')}_${vw.get('lon')}`;
    }
  })
});
