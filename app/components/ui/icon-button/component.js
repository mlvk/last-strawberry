import Ember from 'ember';
import style from 'last-strawberry/utils/styles';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'stretch', 'ui_icon-button', 'btn'],
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
  }
});
