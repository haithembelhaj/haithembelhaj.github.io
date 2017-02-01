/**
 * simple View loader
 * @param content
 * @returns {*}
 */
module.exports = function viewPreloader(content) {

  return content.replace(/template\.jsx/g, 'scripts.js');
}