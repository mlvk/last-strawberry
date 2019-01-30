import Component from '@ember/component';

export default Component.extend({
  classNames: ['row'],

  didInsertElement() {
    this._super(...arguments);
    TweenMax.to(this.$('.syncIcon'), 1, {rotation:-360, repeat:-1, ease: Linear.easeNone});
  }
});
