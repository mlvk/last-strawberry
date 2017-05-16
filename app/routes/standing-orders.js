import Ember from 'ember';
import activeState from "last-strawberry/constants/active-states";

const MODEL_INCLUDES = [
	"locations",
  "locations.company"
];

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set("locations", this.store.peekAll("location"));
		controller.set("item", this.store.peekAll("item"));

    this._super(controller, model);
	},

  model() {
    return Ember.RSVP.all([
			this.store.query("company", { "filter[active_state]":activeState.ACTIVE, include:MODEL_INCLUDES.join(",")}),
			this.store.query("item", {"filter[is_sold]":true})
		]);
  },

	actions: {
		locationSelected(id) {
			this.transitionTo('standing-orders.location', id);
		}
	}
});
