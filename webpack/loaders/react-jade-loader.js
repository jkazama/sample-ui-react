var jade        = require('react-jade');
var loaderUtils = require('loader-utils');

module.exports = function(content) {
  if (this.cacheable) this.cacheable();
  var template = jade.compile(content, loaderUtils.parseQuery(this.query))
  return "module.exports = " + template.toString();
}