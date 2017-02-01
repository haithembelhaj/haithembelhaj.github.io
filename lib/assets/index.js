const Promise = require('bluebird');
const crypto = require('crypto');
const path = require('path');
const mkdirp = require('mkdirp');
const resolve = path.resolve;
const fs = Promise.promisifyAll(require('fs'));
const sass = Promise.promisifyAll(require('node-sass'));
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');
const fileExists = require('../utils').fileExists;

// promisified compile script
const _compileScripts = Promise.promisify(_bundle);

//TODO put these in config
// paths
const srcPath = resolve(__dirname, '../../app');
const destPath = resolve(__dirname, '../../public');

// styles paths
const stylesSrcPath = resolve(srcPath, 'styles');
const stylesDestPath = resolve(destPath, 'styles');
const svgsPath = resolve(srcPath, 'assets/svgs');

// scripts paths
const scriptsSrcPath = resolve(srcPath, 'scripts');
const scriptsDestPath = resolve(destPath, 'scripts');

// create destination folders if missing
mkdirp.sync(stylesDestPath);
mkdirp.sync(scriptsDestPath);

// exports
module.exports.compile = compile;
module.exports.compileScripts = compileScripts;
module.exports.compileStyles = compileStyles;

/**
 * compile all assets
 * @param assets
 * @returns {Thenable<U>|*|Promise.<TResult>|Promise<U>}
 */
function compile(assets, opts) {

  if(!opts) {

    opts = {};
  }

  console.log('compiling', assets);

  return Promise.all([
    compileStyles(assets.styles, assets.view, opts),
    compileScripts(assets.scripts, assets.view, opts)
  ]).then((results) => {

    return {
      styles: results[0],
      scripts: results[1]
    };
  });
}


/**
 * compile scripts files
 * @param paths
 * @param cb
 */
function compileScripts(paths, view, opts){

  // fix paths relativity
  paths = paths.map((path) => resolve(scriptsSrcPath, path));

  return filterPaths(paths)
    .then((_paths) => {

      const scriptsPath = resolve(scriptsDestPath, view + '.js');

      return _compileScripts(_paths, scriptsPath, opts);
    });
}

/**
 * Compile styles files
 * @param paths
 */
function compileStyles(paths, view, opts) {

  // fix paths relativity
  paths = paths.map((path) => resolve(stylesSrcPath, path));

  return filterPaths(paths)
    .then((_paths) => {

      const stylesPath = resolve(stylesDestPath, view + '.css');

      return _compileStyles(_paths, stylesPath, opts);
    });
}

/**
 * bundle
 * @param paths
 * @param outFile
 * @param cb
 * @private
 */
function _bundle(paths, outFile, opts, cb) {

  // returns a Compiler instance
  webpack({
    cache: true,
    watch: true,
    entry: paths,
    output: { path: scriptsDestPath, filename: path.basename(outFile) },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ],
      preLoaders: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'view-loader'
        }
      ]
    },
    plugins: opts.production ? [
      new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
      new webpack.optimize.UglifyJsPlugin()
    ] : [],
    resolveLoader: {
      fallback: [
        path.resolve(__dirname, 'loaders'),
        path.join(process.cwd(), 'node_modules')
      ]
    }
  }, (err, stats) => {

    console.log(stats.toString('normal'));

    cb(err, `/scripts/${stats.hash}.js`);
  });
}

/**
 * actual compilation of styles
 * @param paths
 * @returns {Promise.<TResult>|*|Promise<U>|Thenable<U>}
 * @private
 */
function _compileStyles(paths, outFile, opts) {

  // reverse and map to sass imports
  const _paths = paths.reverse().map((path) => `@import "${path}";`);

  return sass.renderAsync({

    data: `${_paths.join('')}`,
    outFile: outFile,
    sourceMap: true,
    includePaths: [stylesSrcPath],
    importer: [require('compass-importer')],
    functions: {
      svg: require('sass-inline-svg')(svgsPath)
    }
  }).then((res) => {

    console.log('sass compilation duration:', res.stats.duration+'ms');

    const preprocessors = [autoprefixer({ browsers: 'last 2 version' })];

    if(opts.production) {

      preprocessors.push(cssnano());
    }

    return postcss(preprocessors)
      .process(res.css).then((result) => {

        result.warnings().forEach((warn) => {

          console.warn(warn.toString());
        });

        return result.css;
      });
  })
    .then((css) => fs.writeFileAsync(outFile, css));

}


/**
 * generate hash from paths
 * @param paths
 * @returns {Promise.<TResult>|*|Promise<U>|Thenable<U>}
 */
function generateHash(paths) {

  return Promise
    .map(paths, (path) => {

      return fs.statAsync(path)
        .then((stats) => {

          delete stats.atime

          return stats;
        });

    }).then((stats)=> {

      return crypto.createHash('md5').update(JSON.stringify(stats)).digest("hex");
    })
}

/**
 * filter only existing paths
 * @param paths
 * @returns {*}
 */
function filterPaths(paths) {

  return Promise.filter(paths, fileExists);
}
