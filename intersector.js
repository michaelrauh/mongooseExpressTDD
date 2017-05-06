var _ = require('underscore');

function intersect(x, y) {
  return x.filter(function(a) {
      return y.some(function(b) {
          return _.isEqual(a, b);
      });
  });
}

module.exports = {intersect}
