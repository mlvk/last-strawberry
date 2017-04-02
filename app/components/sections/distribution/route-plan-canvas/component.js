import Ember from "ember";
import TemplateValidations from "last-strawberry/validators/route-plan-blueprint";

const { filterBy } = Ember.computed;
const SCROLL_SPEED = 20;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  validators: TemplateValidations,

  init() {
    this._super();
    this.setupStreams();
    this.setupDragula();
  },

  orphanRouteVisits: filterBy("routeVisits", "isOpen", true),

  routeVisitWithId(id) {
    return this.get("routeVisits").find(rv => rv.get("id") === `${id}`);
  },

  setupStreams() {
    this.dragSubject = new Rx.Subject();
    this.mouseMoves = Rx.Observable.fromEvent(window, "mousemove");
    this.dragOverSubject = new Rx.Subject();
    this.dragOvers = this.dragOverSubject
      .map(container => {
        const $c = $(container).closest(".container");
        const cDom = $c[0];
        return {$c, cDom}
      });

    this.dropSubject = new Rx.Subject();

    this.ddStream = this.dropSubject.merge(this.dragOvers);

    this.dragSubject
      .subscribe($item => {
        this.dragOvers
          .takeUntil(this.dropSubject)
          .subscribe(({$c, cDom}) => {
            this.mouseMoves
            .takeUntil(this.ddStream)
            .map(() => {
              const y = $item.position().top - $c.offset().top;
              const maxY = $c.height();
              if(y < 0) {
                const ratio = Math.abs(y/$item.height());
                const factor = Math.min(ratio, 1);
                return -(SCROLL_SPEED * factor);
              } else if(y > (maxY - $item.height())) {
                const ratio = Math.abs((y - (maxY - $item.height()))/$item.height());
                const factor = Math.min(ratio, 1);
                return (SCROLL_SPEED * factor);
              } else {
                return 0
              }
            })
            .distinctUntilChanged()
            .subscribe(e => {
              if(this.animationSub) {
                this.animationSub.dispose();
              }
              this.animationSub = new Rx.Scheduler().schedulePeriodic("", 10, () => cDom.scrollTop += e);
            });
          }, () => {}, () => this.animationSub.dispose());
      })
  },

  setupDragula() {
    this.ddMapping = new Immutable.Map();
    this.drake = dragula([], {
      accepts: (el, target) => {
        const disableDrop = this.$(target).hasClass("disable-drop");
        return this.$(target).data("drop-zone-id") !== undefined && !disableDrop;
      }
    });
    this.addDragulaListeners();
  },

  addDragulaListeners() {
    this.drake.on("cloned", item => this.dragSubject.onNext($(item)));
    this.drake.on("over", (node, container) => this.dragOverSubject.onNext(container));
    this.drake.on("cancel", () => this.dropSubject.onNext())

    this.drake.on("drop", (dragNode, dropNode, fromNode, sibNode) => {
      this.get("deSelectRouteVisit")();
      this.dropSubject.onNext();

      const ot = this.createRouteTransform(dragNode, dropNode, fromNode, sibNode);

      this.get("onRouteVisitUpdate")(ot);

      dragNode.parentElement.removeChild(dragNode)
    });
  },

  createRouteTransform(dragNode, dropNode, fromNode, sibNode) {
    const fromPlanId = this.$(fromNode).data("drop-zone-id");
    const toPlanId = this.$(dropNode).data("drop-zone-id");
    const routeVisit = this.routeVisitWithId(this.$(dragNode).data("location-hash"));
    const nextRouteVisitId = this.$(sibNode).data("location-hash");
    const nextRouteVisit = this.routeVisitWithId(nextRouteVisitId);
    const fromRoutePlan = this.ddMapping.get(fromPlanId);
    const toRoutePlan = this.ddMapping.get(toPlanId);
    const routeVisits = toRoutePlan.get("sortedActiveRouteVisits");
    const lastPosition = routeVisits.get("lastObject.position") || 10;
    let position = lastPosition + 10;

    if(nextRouteVisit) {
      const index = routeVisits.indexOf(nextRouteVisit);
      let startRange = nextRouteVisit.get("position");
      let endRange = 0;

      const previousRouteVisit = routeVisits.objectAt(index-1);
      if(previousRouteVisit) {
        endRange = previousRouteVisit.get("position");
      }

      position = startRange - ((startRange - endRange)/2);
    }

    return {routeVisit, position, fromRoutePlan, toRoutePlan};
  },

  actions: {
    registerDropContainer(container) {
      this.drake.containers.push(container);
    },

    registerRoutePlan(routePlan, containerId) {
      this.ddMapping = this.ddMapping.set(containerId, routePlan);
    },

    submitTemplateName(changeset) {
      this.get("saveRoutePlanBlueprint")(changeset);
      this.set("showSaveRoutePlanBlueprintModal", false);
    },

    startSaveRoutePlanBlueprint(routePlan) {
      const stashedSaveAsTemplateData = {
        routePlan,
        user: routePlan.get("user")
      }

      this.set("stashedSaveAsTemplateData", stashedSaveAsTemplateData);
      this.set("showSaveRoutePlanBlueprintModal", true);
    },

    cancelSaveRoutePlanBlueprint() {
      this.set("showSaveRoutePlanBlueprintModal", false);
    }
  }
});
