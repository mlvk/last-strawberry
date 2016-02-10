import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.address.city(),
  code: (i) => `CODE-${i}`,
  delivery_rate: 0.5,
  active: true
});
/*

t.string   "xero_id",        limit: 255
  t.integer  "company_id"
  t.string   "name",           limit: 255, null: false
  t.string   "code",           limit: 255, null: false
  t.decimal  "delivery_rate",             default: 0.0
  t.boolean  "active",                    default: true, null: false
  t.integer  "address_id"
  t.datetime "created_at",                 null: false
  t.datetime "updated_at",                 null: false
  */
