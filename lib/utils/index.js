const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


module.exports.fileExists = fileExists;

/**
* path exists?
* @param path
*/
function fileExists(path) {


  return new Promise((resolve, reject) => {

    fs.statAsync(path)
      .then((stats) => resolve(stats))
      .catch((err) => {

        if(err.code === 'ENOENT') return resolve(false);

        reject(err);
      })
  })
}
