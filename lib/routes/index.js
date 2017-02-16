const path = require('path');
const config = require('../config');

module.exports = (app) => {

  // index
  app.get('/', (req, res, next) => {

    const page = require(path.resolve(config.dataPath, 'pages/en/index'));

    res
      .render('views/index/template.jsx', {page})
      .catch(next);
  });


  // render error view
  app.use((err, req, res, next)=> {

    console.error(err);

    if (res.headersSent) {

      return next(err);
    }

    res.status(500);
    res.render('views/error/template.jsx', { error: err });
  });
};
