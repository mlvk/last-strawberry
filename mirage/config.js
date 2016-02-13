export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  this.timing = 0;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
  */
  this.get('/companies');
  this.get('/companies/:id');

  this.get('/locations');
  this.get('/locations/:id');

  this.get('/items');
  this.get('/items/:id');

  this.get('/price-tiers');
  this.get('/price-tiers/:id');

  this.get('/item-prices');
  this.get('/item-prices/:id');

  this.get('/item-desires');
  this.get('/item-desires/:id');

  this.post('users/sign_in', ({db: {users}}, request) => {
    const formData = decodeURIComponent(request.requestBody);
    const emailStr = formData.split('&')[1].split('=')[1];
    const {id, email, token, firstName, lastName} = users.where({email:emailStr})[0];
    return {id, email, token, first_name:firstName, last_name:lastName};
  });
}
