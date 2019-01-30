import EmberRouter from '@ember/routing/router';
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("login");
  this.route("items");
  this.route("customers", function() {
    this.route("show", {path:":company_id"}, function() {
      this.route("location", {path:"/locations/:location_id"});
    });
  });

  this.route("sales-orders", function() {
    this.route("show", {path:":id"});
  });

  this.route("purchase-orders", function() {
    this.route("show", {path:":id"});
  });

  this.route("distribution");

  this.route("products");

  this.route("price-tiers", function() {
    this.route("show", {path:":id"});
  });

  this.route("vendors", function() {
    this.route("show", {path:":id"}, function() {
      this.route("location", {path:"/locations/:location_id"});
    });
  });

  this.route("route-plan-blueprints");
  this.route("users");
  this.route("reports", function() {
    this.route("customer-financials");
    this.route('product-financials');
  });

  this.route('standing-orders', function() {
    this.route('location', {path:"/location/:location_id"}, function() {
      this.route('order-template', {path:"/order-template/:order_template_id"});
    });
  });
});

export default Router;
