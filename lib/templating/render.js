const Promise = require('bluebird');
const dependencyTree = require('dependency-tree');
const config = require('../config');
const isDev = config.isDev;
const srcPath = config.srcPath;

const ReactDOM = require('react-dom/server');
const renderToString = ReactDOM.renderToString;

const viewRegexp = /views\/(.*)\/template\.jsx/;

// compile required react files
require('babel-register')({
  extensions: ['.jsx', '.js'],
  only: srcPath
});


/**
 * Render a template and return HTML
 * @param template
 * @param data
 */
module.exports = function renderer(template, data) {

  let view;
  let body;

  try {

    view = require(template);
    body = renderToString(view.default(data));

  } catch(err) {

    console.error(err);

    return Promise.reject(err);
  }

  // get the dependency tree for all required files
  const deps = dependencyTree.toList({
    filename: template,
    directory: '/'
  });

  if(isDev) {

    // invalidate cache
    deps.map((dep) => {

      delete require.cache[require.resolve(dep)];
    });
  }

  // danger!!!!!
  const viewName= template.match(viewRegexp)[1];

  return Promise.resolve(layout(viewName, body, data));
};

function layout(view, body, data) {

  const page = data.page || {};

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${page.title}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta property=”og:title” content=”${page.title}”/>
        <meta property=”twitter:title” content=”${page.title}”/>
        <meta name=”description” content=”${page.description}”>
        <meta property=”og:description” content=”${page.description}”/>
        <meta property=”twitter:description” content=”${page.description}”/>
        <link rel="stylesheet" href="/styles/${view}.css">
      </head>
      <body>
        <div id="root">${body}</div>
        <script>window.viewData = ${JSON.stringify(data)}</script>
        <script src="/scripts/${view}.js" async></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', '${config.googleAnalyticsId}', 'auto');
          ga('send', 'pageview');
        </script>
      </body>
    </html>
  `;
}
