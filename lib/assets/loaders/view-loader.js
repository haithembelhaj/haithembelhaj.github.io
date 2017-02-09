/**
 * simple View loader
 * @param content
 * @returns {*}
 */
module.exports = function viewPreloader(content) {

  this.cacheable();

  const callback = this.async();

  return process.nextTick(()=> callback(null, content.replace(/template\.jsx/g, 'scripts.js')));
}