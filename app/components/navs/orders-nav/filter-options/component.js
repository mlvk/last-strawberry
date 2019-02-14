import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isHidden:true,

  title: computed("isHidden", function() {
    const isHidden = this.get("isHidden");
    return isHidden? "Show Filter Options": "Hide Filter Options";
  })
});
