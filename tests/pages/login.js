import PageObject from '../page-object';

const { clickable, fillable, text, visitable } = PageObject;

export default PageObject.create({
  visit: visitable('/login'),
  username: fillable('.username'),
  password: fillable('.password'),
  submit: clickable('button'),
  error: text('.errors')
});
