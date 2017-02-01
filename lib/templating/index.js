const _ = require('lodash');
const resolve = require('path').resolve;
const render = require('./render');
const express = module.parent.require('express');
const response = express.response;

const viewDir = resolve(__dirname, '../../app');

const reqProps = ['baseUrl', 'body', 'cookies', 'fresh', 'hostname', 'ip', 'method', 'originalUrl', 'params', 'path', 'protocol', 'query', 'route', 'secure'];

response.render = function(template, data) {

  const res = this;
  const req = res.req;
  const app = res.app;
  const globals = _.extend({req: _.pick(req, reqProps)}, app.locals, res.locals);

  // set res type to HTML
  res.set({ 'content-type': 'text/html; charset=utf-8'});

  return render(resolve(viewDir, template), _.extend(data, {global: globals}))
    .then((html) => {

      res.send(html);
  });
};

// export nothing for the time beeing
module.exports = function(app) {}