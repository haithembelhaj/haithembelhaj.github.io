

module.exports = (app) => {

  // index
  app.get('/', (req, res, next) => {

    res
      .render('views/index/template.jsx', {
        page: {
          title: 'A fullstack develper!',
          description: 'Hi! I\'m a frontend engineer with serious backend skills',
        }
      })
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
