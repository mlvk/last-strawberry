export default function(server) {
  createUsers(server);
  createItems(server);
  createPriceTiers(server);
  createCompanies(server);
  createItemDesires(server);
  createSalesOrders(server);
}

function createUsers(server) {
  server.create('user', {email:'admin@wutang.com', password:'password', token:'admin_token'});
  server.create('user', {email:'driver@wutang.com', password:'password', token:'driver_token'});
  server.create('user', {email:'accountant@wutang.com', password:'password', token:'accountant_token'});
}

function createItems(server) {
  server.createList('item', 10);
}

function createPriceTiers(server) {
  server.create('price-tier', {name:'distributor'});
  server.create('price-tier', {name:'wholesale'});
  server.create('price-tier', {name:'retail'});

  server.db.priceTiers
    .forEach(priceTier => {
      server.db.items
        .forEach(item => {
          server.create('item-price', {priceTierId:priceTier.id, itemId:item.id});
        });
    });
}

function createCompanies(server) {
  const count = 10;
  for(var i = 0; i < count; i++) {
    const company = server.create('company');
    for(var j = 0; j < 2; j++) {
      createLocationWithAddress(server, company.id);
    }
  }
}

function createLocationWithAddress(server, id) {
  const address =  server.create('address');

  const randomPriceTierIndex = _.random(0, server.db.priceTiers.size);
  const priceTier = server.db.priceTiers[randomPriceTierIndex];

  server.create('location', {companyId:id, addressId:address.id, priceTierId:priceTier.id});
}

function createItemDesires(server) {
  server.db.locations
    .forEach(location => {
      server.db.items
        .forEach(item => {
          server.create('item-desire', {itemId:item.id, locationId:location.id, enabled:true});
        })
    })
}

function createSalesOrders(server) {
  const deliveryDate = moment().add(1, 'days').format('YYYY-MM-DD');
  
  server.db.locations
    .forEach(location => {
      server.create('order', {locationId:location.id, deliveryDate});
    });
}
