import Ember from 'ember';
import computed from 'ember-computed-decorators';
const { notEmpty } = Ember.computed;

const SCROLL_SPEED = 20;

export default Ember.Component.extend({
  classNames: ['col', 'stretch'],

  // openOrders: Ember.computed('orders.[]', 'routePlans.@each.routeVisits', function(){
  //   return this.get('routePlans')
  //     .reduce((acc, rp) => rp.consumeOrders(acc), this.get('orders'));
  // }),
  //
  // @computed('openOrders.[]')
  // openOrderGroups (orders) {
  //   return _.groupBy(orders, order => order.get('locationHash'));
  // },
  //
  // hasOrderGroups: notEmpty('orders'),

  @computed('routeVisits.@each.{isOrphan}')
  orphanedRouteVisits(routeVisits) {
    return routeVisits.filter(rv => rv.get('isOrphan'));
  },

  @computed('routePlans.@each.{date,template}', 'date')
  activeRoutePlans(routePlans, date) {
    return routePlans
      .filter(rp => !rp.get('template'))
      .filter(rp => rp.get('date') === date)
      .map((rp, index) => {
        rp.set('index', index)
        return rp;
      });
  },

  @computed('routePlans.@each.{template}')
  routePlanTemplates(rps) {
    return rps.filter(rp => rp.get('template'));
  },

  init() {
    this._super();
    this._setupStreams();
    this._setupDragula();
  },

  // _visitWindowWithLocationHash(locationHash) {
  //   return this.get('visitWindows').find(vw => vw.get('locationHash') === locationHash);
  // },

  _routeVisitWithId(id) {
    return this.get('routeVisits').find(rv => rv.get('id') === `${id}`);
  },

  _setupStreams() {
    this.dragSubject = new Rx.Subject();
    this.mouseMoves = Rx.Observable.fromEvent(window, 'mousemove');
    this.dragOverSubject = new Rx.Subject();
    this.dragOvers = this.dragOverSubject
      .map(container => {
        const $c = $(container).closest('.container');
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

  _setupDragula() {
    this.ddMapping = new Immutable.Map();
    this.drake = dragula([], {
      accepts: (el, target) => this.$(target).data('drop-zone-id') !== undefined
    });
    this._addDragulaListeners();
  },

  _addDragulaListeners() {
     this.drake.on('cloned', (item) => {
       this.dragSubject.onNext($(item));
     });

    this.drake.on('over', (node, container) => {
      this.dragOverSubject.onNext(container);
    });

    this.drake.on('cancel', () => this.dropSubject.onNext())

    this.drake.on('drop', (dragNode, dropNode, fromNode, sibNode) => {
      this.dropSubject.onNext();
      const ot = this._createRouteTransform(dragNode, dropNode, fromNode, sibNode);
      Ember.run.schedule('afterRender', this, () => {
        if(dragNode.parentElement && (ot.fromRoutePlan !== ot.toRoutePlan)) {
          dragNode.parentElement.removeChild(dragNode)
        }
      });

      this.attrs.routeVisitChanged(ot.routeVisit, ot.toRoutePlan, ot.position);

      // ot.routeVisit.setProperties({routePlan:ot.toRoutePlan, position:ot.position});
    });
  },

  _createRouteTransform(dragNode, dropNode, fromNode, sibNode) {
    const fromPlanId = this.$(fromNode).data('drop-zone-id');
    const toPlanId = this.$(dropNode).data('drop-zone-id');
    const routeVisit = this._routeVisitWithId(this.$(dragNode).data('location-hash'));
    const nextRouteVisitId = this.$(sibNode).data('location-hash');
    const nextRouteVisit = this._routeVisitWithId(nextRouteVisitId);
    const fromRoutePlan = this.ddMapping.get(fromPlanId);
    const toRoutePlan = this.ddMapping.get(toPlanId);
    const sortedRouteVisits = toRoutePlan.get('routeVisits').sortBy('position');
    const lastPosition = sortedRouteVisits.get('lastObject.position') || 10;
    let position = lastPosition + 10;

    if(nextRouteVisit) {
      const index = sortedRouteVisits.indexOf(nextRouteVisit);
      let startRange = nextRouteVisit.get('position');
      let endRange = 0;

      const previousRouteVisit = sortedRouteVisits.objectAt(index-1);
      if(previousRouteVisit) {
        endRange = previousRouteVisit.get('position');
      }

      position = startRange - ((startRange - endRange)/2);
      console.log(startRange, endRange, position);
    }

    return {routeVisit, position, fromRoutePlan, toRoutePlan};
  },

  _clearSaveTemplate() {
    this.set('showSaveTemplateModal', false);
    this.set('saveTemplateOptions', undefined);
  },

  actions: {
    registerDropContainer(container) {
      this.drake.containers.push(container);
    },

    registerRoutePlan(routePlan, containerId) {
      this.ddMapping = this.ddMapping.set(containerId, routePlan);
    },

    submitTemplateName(name) {
      this.attrs.saveTemplate(this.get('saveTemplateOptions.routePlan'), name);
      this._clearSaveTemplate();
    },

    startSaveTemplate(routePlan, trigger) {
      this.set('saveTemplateOptions', {trigger, routePlan});
      this.set('showSaveTemplateModal', true);
    },

    cancelSaveTemplate() {
      this._clearSaveTemplate();
    }
  }

});
