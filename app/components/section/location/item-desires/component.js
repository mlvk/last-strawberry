import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['item-desires'],

  @computed('itemDesires.@each.{enabled}', 'items.[]')
  collection(itemDesires = [], items = []) {
    return items.map(item => {
        const match = itemDesires.find(itemDesire => itemDesire.get('item.id') === item.get('id'));
        if(match) {
          return {id:match.get('item.id'), text:match.get('item.name'), enabled:match.get('enabled')};
        } else {
          return {id:item.get('id'), text:item.get('name'), enabled:false};
        }
      });
  }
});
