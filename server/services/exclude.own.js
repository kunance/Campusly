'use strict';

module.exports.excludeOwn = function(array, id) {
  var withoutOwn = [];
  for (var i = 0; i < array.length; i += 1) {
    if (array[i].userId) {
      if (array[i].userId != id) {
        withoutOwn.push(array[i])
      } else {
        withoutOwn.splice(i, 1);
      }
    }
    if (array[i].roomDetails) {
      if (array[i].roomDetails.creatorId != id) {
        withoutOwn.push(array[i])
      } else {
        withoutOwn.splice(i, 1);
      }
    }
  }
  return withoutOwn;

};


