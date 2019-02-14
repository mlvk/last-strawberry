import { resolve } from 'rsvp';
import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';
import { buildStyles } from "last-strawberry/utils/styles";

export default Component.extend({
  classNames: ["row", "ui_icon-button", "btn"],
  classNameBindings: ["disabled:disabled", "flat:flat:card-1", "hasError:error", "loading:loading"],
  attributeBindings:["componentStyles:style"],

  hasLabel: notEmpty("label"),
  hasIcon:  notEmpty("iconName"),

  startSpin() {
    const targ = this.$(".iconContainer");
    this.spinTween = TweenMax.to(targ, 0.5, {rotation:360, repeat:-1});
  },

  stopSpin() {
    this.clearTween();
    const targ = this.$(".iconContainer");
    TweenMax.to(targ, 0, {rotation:0});
  },

  clearTween() {
    if(this.spinTween){
      this.spinTween.kill();
    }
  },

  willDestroyElement() {
    this.clearTween();
  },

  iconName: computed("type", "loading", function() {
    const type = this.get("type");
    const loading = this.get("loading");
    return loading ? "loop" : type;
  }),

  fmtLabel: computed("loading", "hasError", "label", function() {
    const loading = this.get("loading");
    const hasError = this.get("hasError");
    const label = this.get("label");
    if(loading) {
      return this.get("loadingMessage") || "Loading...";
    } else if(hasError) {
      return "Error";
    } else {
      return label;
    }
  }),

  componentStyles: computed("size", "padding", "color", "backgroundColor", "borderRadius", function(){
    const size = this.get('size') || "1";
    let padding = this.get('padding');
    const color = this.get('color') || "white";
    const backgroundColor = this.get('backgroundColor') || "";
    const borderRadius = this.get('borderRadius') || 0;

    padding = padding === undefined ? size: padding;

    return buildStyles({
      'padding': `${padding}em`,
      'font-size': `${size/2}em`,
      'border-radius': `${borderRadius}px`,
      'color': `${color}`,
      'background-color': `${backgroundColor}`
    });
  }),

  click() {
    if(!this.get("loading")){
      this.set("hasError", false);
      this.set("loading", true);

      this.startSpin();

      const response = this.get("action")();
      const promise = response ? response : resolve();

      promise
        .then(() => {
          this.set("loading", false);
          this.stopSpin();
        })
        .catch(() => {
          this.stopSpin();
          this.set("loading", false);
          this.set("hasError", true);
        });
    }
  }

});
