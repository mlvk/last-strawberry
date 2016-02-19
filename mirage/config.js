export default function() {

  this.timing = 0;

  this.get('/addresses');
  this.get('/addresses/:id');

  this.patch('/addresses/:id');
  this.post('/addresses');

  this.get('/companies');
  this.get('/companies/:id');
  this.patch('/companies/:id');
  this.post('/companies');

  this.get('/locations');
  this.get('/locations/:id');

  this.get('/orders');
  this.get('/orders/:id');
  this.patch('/orders/:id');
  this.post('/orders');

  this.get('/items');
  this.get('/items/:id');

  this.get('/price-tiers');
  this.get('/price-tiers/:id');

  this.get('/item-prices');
  this.get('/item-prices/:id');

  this.get('/item-desires');
  this.get('/item-desires/:id');
  this.patch('/item-desires/:id');
  this.post('/item-desires');

  this.get('/visit-windows');
  this.get('/visit-window/:id');
  this.patch('/visit-windows/:id');
  this.post('/visit-windows');

  this.get('/visit-days');
  this.get('/visit-days/:id');
  this.patch('/visit-days/:id');
  this.post('/visit-days');

  this.get('/visit-window-days');
  this.get('/visit-window-days/:id');
  this.patch('/visit-window-days/:id');
  this.post('/visit-window-days');

  this.post('users/sign_in', ({db: {users}}, request) => {
    const formData = decodeURIComponent(request.requestBody);
    const emailStr = formData.split('&')[1].split('=')[1];
    const {id, email, token, firstName, lastName} = users.where({email:emailStr})[0];
    return {id, email, token, first_name:firstName, last_name:lastName};
  });

}
