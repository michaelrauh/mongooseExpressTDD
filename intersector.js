var _ = require('underscore');

function intersect(x, y) {
  return x.filter((a) => {
    return y.some((b) => {
      return _.isEqual(a, b);
    });
  });
}

module.exports = {
  intersect
}
