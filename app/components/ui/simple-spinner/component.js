import Component from '@ember/component';
import { style } from 'last-strawberry/utils/styles';

export default Component.extend({
  classNameBindings: ['enabled::disabled'],
  attributeBindings: ['componentStyles:style'],

  @style('size')
  componentStyles(size = 2) {
    return {
      'width': `${size}em`,
      'height': `${size}em`
    };
  }
});
