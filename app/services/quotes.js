import $ from 'jquery';
import Service from '@ember/service';
import { alias } from '@ember/object/computed';
import { run } from '@ember/runloop';
import config from 'last-strawberry/config/environment';

const SUBJECTS = [
  "movies",
  "famous"
];

export default Service.extend({
  quote: alias("current.quote"),
  author: alias("current.author"),

  init(){
    this._super(...arguments);
    this.refreshQuote();
  },

  async refreshQuote(){
    const headers = {
      "X-Mashape-Key":config.quoteApi.accessToken,
      "Content-Type":"application/x-www-form-urlencoded",
      "Accept":"application/json"
    };

    const subject = SUBJECTS[_.random(0, SUBJECTS.length - 1)];

    const payload = {
      url: `https://andruxnet-random-famous-quotes.p.mashape.com/cat=${subject}`,
      method: "POST",
      headers:headers
    };

    const quoteJSON = await $.ajax(payload);

    run(() => this.set("current", JSON.parse(quoteJSON)));
  }
});
