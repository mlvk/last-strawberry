import Component from '@ember/component';
import { computed } from '@ember/object';
import { buildStyles } from "last-strawberry/utils/styles";

export default Component.extend({
  classNameBindings: ['enabled::disabled'],
  attributeBindings: ['componentStyles:style'],

  componentStyles: computed('size', function() {
    const size = this.get('size') || 2;
    return buildStyles({
      width: `${size}em`,
      height: `${size}em`
    });
  })
});
