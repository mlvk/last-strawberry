import Component from '@ember/component';
import {
  rgba,
  buildStyles
} from "last-strawberry/utils/styles";
import colors from "last-strawberry/constants/colors";
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["col"],
  attributeBindings:["componentStyles:style"],

  componentStyles: computed("colorScheme.backgroundColor", "isSelected", function() {
    const backgroundColor = this.get('colorScheme.backgroundColor') || colors.DARK_ORANGE;
    const isSelected = this.get('isSelected') || false;
    const color = isSelected ? rgba(backgroundColor, 0.8) : backgroundColor;

    return buildStyles({'background-color': color});
  })
});
