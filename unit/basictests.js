/* This script expects node.js  and mocha */

"use strict";

describe("FastPriorityQueue", function () {
    var FastPriorityQueue = require("../FastPriorityQueue.js");


    it('Random', function () {
      for(var ti = 0; ti < 100; ti++) {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        var N = 1024+ti;
        for(var i = 0; i < N; ++i) {
          b.add(Math.floor((Math.random() * 1000000) + 1));
        }
        var v = 0;
        while(!b.isEmpty()) {
          var nv = b.poll();
          if(nv < v) throw "bug";
          v = nv;
        }
}
    });

});
