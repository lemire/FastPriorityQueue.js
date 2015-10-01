/* This script expects node.js  and mocha */

"use strict";

describe("FastPriorityQueue", function () {
    var FastPriorityQueue = require("../FastPriorityQueue.js");
    var seed = 1;
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }


    it('Random', function () {
        for(var ti = 0; ti < 100; ti++) {
            var b = new FastPriorityQueue(function(a, b) {
                return a - b;
            });
            var N = 1024+ti;
            for(var i = 0; i < N; ++i) {
                b.add(Math.floor((random() * 1000000) + 1));
            }
            var v = 0;
            while(!b.isEmpty()) {
                var nv = b.poll();
                if(nv < v) throw "bug";
                v = nv;
            }
        }
    });
    it('RandomArray', function () {
        for(var ti = 0; ti < 100; ti++) {
            var b = new FastPriorityQueue(function(a, b) {
                return a - b;
            });
            var array = new Array();
            var N = 1024+ti;
            for(var i = 0; i < N; ++i) {
                var val  = Math.floor((random() * 1000000) + 1);
                b.add(val);
                array.push(val);
            }
            array.sort(function(a, b) {
                return b-a
            });
            while(!b.isEmpty()) {
                var nv = b.poll();
                var nx = array.pop();
                if(nv != nx) throw "bug";
            }
        }
    });
    it('RandomArrayEnDe', function () {
        for(var ti = 0; ti < 100; ti++) {
            var b = new FastPriorityQueue(function(a, b) {
                return a - b;
            });
            var array = new Array();
            var N = 16+ti;
            for(var i = 0; i < N; ++i) {
                var val  = Math.floor((random() * 1000000) + 1);
                b.add(val);
                array.push(val);
            }
            array.sort(function(a, b) {
                return b-a
            });
            for(var j = 0; j < 1000; ++j) {
                var nv = b.poll();
                var nx = array.pop();
                if(nv != nx) throw "bug";
                var val  = Math.floor((random() * 1000000) + 1);
                b.add(val);
                array.push(val);
                array.sort(function(a, b) {
                    return b-a
                });
            }
        }
    });

});
