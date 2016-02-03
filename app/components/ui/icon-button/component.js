import Em from 'ember';
import style from 'last-strawberry/utils/styles';

const { computed: { notEmpty }} = Em;

export default Em.Component.extend({
  classNames: ['row', 'iconButton'],
  classNameBindings: ['disabled:disabled', 'flat:flat:card-1'],
  attributeBindings:['componentStyles:style'],

  hasLabel: notEmpty('label'),

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

  didInsertElement() {
    this.mc = new Hammer.Manager(this.element);
    this.mc.add( new Hammer.Tap({ event: 'singleTap', taps: 1, time: 1000 }) );
    this.mc.on('singleTap', () => this.attrs.onClick());
  },

  willDestroyElement() {
    this.mc.destroy();
  }
});
