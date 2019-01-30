import Component from '@ember/component';
import {
  style,
  rgba
} from "last-strawberry/utils/styles";

export default Component.extend({
    classNames: ['row'],
    attributeBindings:["componentStyles:style"],

    @style("colorScheme.backgroundColor")
    componentStyles(backgroundColor) {
      return {
        "background-color": rgba(backgroundColor, 0.5)
      };
    }
});
