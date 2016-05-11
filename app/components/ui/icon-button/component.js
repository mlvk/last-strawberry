import Ember from 'ember';
import style from 'last-strawberry/utils/styles';
import computed from 'ember-computed-decorators';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'ui_icon-button', 'btn'],
  classNameBindings: ['disabled:disabled', 'flat:flat:card-1'],
  attributeBindings:['componentStyles:style'],

  hasLabel: notEmpty('label'),

  loadingChanged: Ember.observer('loading', function() {
    Ember.run.once(this, 'updateSpinState');
  }),

  updateSpinState() {
    const targ = this.$('.iconContainer');
    if(targ){
      if(this.get('loading')) {
        TweenMax.to(targ, 0.5, {rotation:360, repeat:-1});
      } else {
        TweenMax.to(targ, 0, {rotation:0});
      }
    }
  },

  @computed('type', 'loading')
  iconName(type, loading) {
    return loading ? 'loop' : type;
  },

  @style('size', 'padding', 'color', 'backgroundColor', 'borderRadius')
  componentStyles(
    size = '1',
    padding,
    color = 'white',
    backgroundColor = "",
    borderRadius = 0
  ) {
    padding = padding || size;
    return {
      'padding': `${padding}em`,
      'font-size': `${size/2}em`,
      'border-radius': `${borderRadius}px`,
      'color': color,
      'background-color': backgroundColor
    };
  },

  click() {
    if(!this.get('loading')){
      this.set('loading', true);

      Ember.RSVP.allSettled([this.attrs.action()])
        .then(() => this.set('loading', false))
        .catch(() => this.set('loading', false));
    }
  }

});
