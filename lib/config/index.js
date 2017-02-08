const resolve = require('path').resolve;
const env = process.env;

// is dev
const isDev = env.NODE_ENV === 'development';

// paths
const srcPath = resolve(__dirname, '../../app');
const destPath = resolve(__dirname, '../../public');

const googleAnalyticsId = 'UA-29281448-1';

module.exports = {

  isDev,
  srcPath,
  destPath,
  googleAnalyticsId,
};
