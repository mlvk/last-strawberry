import Em from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';

const { computed: { gt }} = Em;

export default DS.Model.extend({

  code: DS.attr('string'),
  clientItemDesires: DS.hasMany('client-item-desire'),
  company: DS.attr('string'),
  creditRate: DS.attr('number'),
  deliveryRate: DS.attr('number'),
  nickname: DS.attr('string'),
  priceTier: DS.belongsTo('price-tier'),
  salesOrders: DS.hasMany('sales-order'),
  terms: DS.attr('number'),
  visitWindows: DS.hasMany('visit-window'),
  clientVisitDays: DS.hasMany('client-visit-day'),
  active: DS.attr('boolean'),

  cvdForDay (dayOfWeek) {
    return this.get('clientVisitDays').find(cvd => cvd.get('day') === dayOfWeek);
  },

  scheduledForDeliveryOn (dayOfWeek) {
    return (!!this.cvdForDay(dayOfWeek));
  },

  @computed('clientVisitDays.@each.{enabled}')
  enabledVisitDays(clientVisitDays) {
    return clientVisitDays.filter(cvd => cvd.get('enabled'));
  },

  @computed('enabledVisitDays')
  enabledVisitDayIndexes(clientVisitDays) {
    return clientVisitDays.map(cvd => cvd.get('day'));
  },

  @computed('code', 'company', 'nickname')
  fullName(code, company, nickname) {
    if(nickname) {
      return `${code} - ${company} - ${nickname}`;
    } else {
      return `${code} - ${company}`;
    }
  },

  @computed('code', 'nickname')
  codeNickname(code, nickname) {
    if(nickname) {
      return `${code} - ${nickname}`;
    } else {
      return `${code}`;
    }
  },

  @computed('company', 'nickname')
  commonName(company, nickname) {
    if(nickname) {
      return `${company} - ${nickname}`;
    } else {
      return `${company}`;
    }
  },

  hasCreditTerms: gt('creditRate', 0),

  priceForItemId(itemId) {
    const match = this.get('priceTier.itemPrices')
      .find(ip => ip.get('item.id') === itemId);

    return match ? match.get('price') : 0;
  },

  creditRateForItemId(itemId) {
    return this.get('creditRate') * this.priceForItemId(itemId);
  }

});
