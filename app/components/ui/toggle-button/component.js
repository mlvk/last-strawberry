import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['row', 'center'],
  classNameBindings: ['isSelected:selected'],

  hasLabel: notEmpty("label"),
  hasIcon: notEmpty("iconName"),

  shouldEnableTooltip: notEmpty("toolTipMessage"),

  isSelected: computed("selected", function() {
    const val = this.get("selected");
    return (val === "true" || val === true);
  }),

  toolTipMessage: computed("isSelected", "selectedTooltipMessage", "unSelectedTooltipMessage", function() {
    const isSelected = this.get("isSelected");
    const selectedTooltipMessage = this.get("selectedTooltipMessage");
    const unSelectedTooltipMessage = this.get("unSelectedTooltipMessage");
    if(isSelected && isPresent(selectedTooltipMessage)) {
      return selectedTooltipMessage;
    }

    if(!isSelected && isPresent(unSelectedTooltipMessage)) {
      return unSelectedTooltipMessage;
    }

    return undefined;
  })
});
