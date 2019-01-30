import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  isHidden:true,

  @computed("isHidden")
  title(isHidden) {
    return isHidden? "Show Filter Options": "Hide Filter Options";
  }
});
