import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import ItemTypes from "last-strawberry/constants/item-types";

export default Controller.extend({
  products: filterBy("items", "tag", ItemTypes.PRODUCT)
});
