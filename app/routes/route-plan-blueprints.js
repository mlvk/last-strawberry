import { all } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
	setupController(controller, model) {
    this._super(controller, model);

		controller.set("users", this.store.peekAll("user"));
		controller.set("routePlanBlueprints", this.store.peekAll("route-plan-blueprint"));
	},

	model(){
		return all([
			this.store.findAll("user"),
      this.store.findAll("route-plan-blueprint")
		]);
	},

  actions: {
		saveRoutePlanBlueprint(id, name, driver) {
			const routePlanBlueprint = this.store.peekRecord("route-plan-blueprint", id);
			routePlanBlueprint.set("name", name);
			routePlanBlueprint.set("user", driver);

			routePlanBlueprint.save();
		},

		deleteRoutePlanBlueprint(routePlanBlueprint) {
			routePlanBlueprint.destroyRecord();
		}
  }
});
