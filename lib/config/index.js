const resolve = require('path').resolve;
const env = process.env;

// is dev
const isDev = env.NODE_ENV === 'development';

// paths
const rootPath = resolve(__dirname, '../../');
const srcPath = resolve(rootPath, 'app');
const destPath = resolve(rootPath, 'public');

const googleAnalyticsId = 'UA-29281448-1';

module.exports = {

  isDev,
  rootPath,
  srcPath,
  destPath,
  googleAnalyticsId,
};

