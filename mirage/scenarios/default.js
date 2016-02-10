export default function(server) {
  createCompanies(server);
}

function createCompanies(server) {
  const count = 20;
  for(var i = 0; i < count; i++) {
    const company = server.create('company');
    for(var j = 0; j < 5; j++) {
      createLocationWithAddress(server, company.id);
    }
  }
}

function createLocationWithAddress(server, id) {
  const address =  server.create('address');
  server.create('location', {companyId:id, addressId:address.id});
}
