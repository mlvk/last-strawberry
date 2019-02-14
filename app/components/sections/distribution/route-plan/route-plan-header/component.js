import Component from '@ember/component';
import {
  rgba,
  buildStyles
} from "last-strawberry/utils/styles";
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ['row'],
    attributeBindings:["componentStyles:style"],

    componentStyles: computed("colorScheme.backgroundColor", function() {
      const backgroundColor = this.get('colorScheme.backgroundColor');

      return buildStyles({'background-color': rgba(backgroundColor, 0.5)});
    })
});
