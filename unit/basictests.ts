/* This script expects node.js  and mocha */

import {FastPriorityQueue} from '../FastPriorityQueue';

describe('FastPriorityQueue', function() {
  var seed = 1;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  it('example1', function() {
    var x = new FastPriorityQueue(function(a, b) {
      return a < b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 0) throw 'bug';
    if (x.poll() != 1) throw 'bug';
    if (x.poll() != 3) throw 'bug';
    if (x.poll() != 4) throw 'bug';
    if (x.poll() != 5) throw 'bug';
  });

  it('example2', function() {
    var x = new FastPriorityQueue(function(a, b) {
      return a > b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 5) throw 'bug5';
    if (x.poll() != 4) throw 'bug4';
    if (x.poll() != 3) throw 'bug3';
    if (x.poll() != 1) throw 'bug1';
    if (x.poll() != 0) throw 'bug0';
  });

  it('Random', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue<number>(function(a, b) {
        return a < b;
      });
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        b.add(Math.floor((random() * 1000000) + 1));
      }
      var v = 0;
      while (!b.isEmpty()) {
        var nv = b.poll();
        if (!nv || nv < v) throw 'bug';
        v = nv;
      }
    }
  });
  it('RandomArray', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var array = new Array();
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      while (!b.isEmpty()) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
      }
    }
  });
  it('RandomArrayEnDe', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var array = new Array();
      var N = 16 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      for (var j = 0; j < 1000; ++j) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
        array.sort(function(a, b) {
          return b - a;
        });
      }
    }
  });

});
