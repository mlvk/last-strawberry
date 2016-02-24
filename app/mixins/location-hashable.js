import Ember from 'ember';

export default Ember.Mixin.create({
  locationHash: Ember.computed('lat', 'lng', function(){
    return `~${this.get('lat')}_${this.get('lng')}`;
  })
});
