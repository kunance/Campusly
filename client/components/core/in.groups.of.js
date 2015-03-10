(function() {
  'use strict';
  Array.prototype.inGroupsOf = function (n) {
    var ret = [];
    var group = [];
    var len = this.length;
    var per = len * (n / len);

    for (var i = 0; i < len; ++i) {
      group.push(this[i]);
      if ((i + 1) % n == 0) {
        ret.push(group);
        group = [];
      }
    }
    
    if (group.length) ret.push(group);
    return ret;
  }

})();
