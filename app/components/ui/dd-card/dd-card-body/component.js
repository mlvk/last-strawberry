import Component from '@ember/component';
import Colors from "last-strawberry/constants/colors";
import { computed } from '@ember/object';
import { buildStyles } from "last-strawberry/utils/styles";

export default Component.extend({
  classNames: ["row"],
  attributeBindings:["componentStyles:style"],

  componentStyles: computed("colorScheme", function() {
    const colorScheme = this.get('colorScheme');
    const color = colorScheme !== undefined? colorScheme.color: Colors.DARK_GREY;
    return buildStyles({color});
  })
});
