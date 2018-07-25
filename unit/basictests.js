/* This script expects node.js  and mocha */

'use strict';

describe('FastPriorityQueue', function() {
  var FastPriorityQueue = require('../FastPriorityQueue.js');
  var seed = 1;

  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function checkOrderNonVolatile(x, iterOrder) {
    // TODO once we trasnpile
    //if (!Symbol || !Symbol.iterator) return;
    // let i = 0;
    // for (let next of x) {
    //   var item = iterOrder[i++];
    //   if (next !== item) throw 'expected=' + item + ', got=' + next;
    // }
    var j = 0;
    x.forEach(function(next, i) {
      j++;
      var item = iterOrder[i];
      //var next = iter.next().value;
      if (next !== item) throw 'expected=' + item + ', got=' + next;
    });
    if (j !== iterOrder.length) throw 'bug';
  }

  it('example1', function() {
    // ascending
    var x = new FastPriorityQueue(function(a, b) {
      return a < b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);

    var iterOrder = [0, 1, 3, 4, 5];

    // first iterate without mutating the queue
    checkOrderNonVolatile(x, iterOrder);

    // then iterate via polling
    for (var i = 0; i < iterOrder.length; i++) {
      var item = iterOrder[i];
      if (x.poll() != item) throw 'bug';
    }
  });

  it('example2', function() {
    // descending
    var x = new FastPriorityQueue(function(a, b) {
      return a > b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);

    var iterOrder = [5, 4, 3, 1, 0];

    // first iterate without mutating the queue
    checkOrderNonVolatile(x, iterOrder);

    // then iterate via polling
    for (var i = 0; i < iterOrder.length; i++) {
      var item = iterOrder[i];
      if (x.poll() != item) throw 'bug';
    }
  });

  it('remove', function() {
    var x = new FastPriorityQueue();

    // should return false when queue is empty
    if(x.remove(0) !== false) throw 'bug';

    x.heapify([8, 6, 7, 5, 3, 0, 9, 1, 0]);
    checkOrderNonVolatile(x, [0, 0, 1, 3, 5, 6, 7, 8, 9]);

    // should return false when no matching element is in the queue
    if(x.remove(10) !== false) throw 'bug';

    if (!x.remove(0)) throw 'bug';
    checkOrderNonVolatile(x, [0, 1, 3, 5, 6, 7, 8, 9]);

    if (!x.remove(7)) throw 'bug';
    if (!x.remove(3)) throw 'bug';
    checkOrderNonVolatile(x, [0, 1, 5, 6, 8, 9]);

    if (!x.remove(9)) throw 'bug';
    checkOrderNonVolatile(x, [0, 1, 5, 6, 8]);

    if (!x.remove(6)) throw 'bug';
    checkOrderNonVolatile(x, [0, 1, 5, 8]);

    if (!x.remove(1)) throw 'bug';
    checkOrderNonVolatile(x, [0, 5, 8]);

    if (x.remove(1)) throw 'bug';
    checkOrderNonVolatile(x, [0, 5, 8]);
  });

  it('removeOne', function() {
    var x = new FastPriorityQueue();
    
    var callback = function(val) {
      return val === 1;
    }

    var removedItem = x.removeOne(callback);
    if (removedItem !== undefined) throw 'bug';

    x.heapify([8, 6, 7, 5, 3, 0, 9, 1, 0]);

    removedItem = x.removeOne(callback);
    if (removedItem !== 1) throw 'bug';
    checkOrderNonVolatile(x, [0, 0, 3, 5, 6, 7, 8, 9]);

    removedItem = x.removeOne(callback);
    if (removedItem !== undefined) throw 'bug';
    checkOrderNonVolatile(x, [0, 0, 3, 5, 6, 7, 8, 9]);
  });  

  it('removeMany', function() {
    var x = new FastPriorityQueue();
    x.heapify([8, 9, 9, 2, 1, 0, 4, 6, 2, 7, 6, 8, 7, 8, 0, 6, 7, 1, 6, 1, 7, 8, 3, 8, 4, 1, 2, 9, 6, 1, 8, 7, 2, 7, 7, 8, 8, 5, 8, 8]);

    var callback = function(val) {
      return val === 6;
    }
    var removedItems = x.removeMany(callback);
    if (removedItems.length !== 5 || x.size !== 35) throw 'bug';
    checkOrderNonVolatile(x, [0,0,1,1,1,1,1,2,2,2,2,3,4,4,5,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,9,9,9]);

    callback = function(val) {
      return val > 6;
    }
    removedItems = x.removeMany(callback);
    if (removedItems.length !== 20 || x.size !== 15) throw 'bug';
    checkOrderNonVolatile(x, [0,0,1,1,1,1,1,2,2,2,2,3,4,4,5]);

    callback = function(val) {
      return true;
    }
    removedItems = x.removeMany(callback, 10);
    if (removedItems.length !== 10 || x.size !== 5) throw 'bug';
  });

  it('removeMany remove all - one item', function() {
    var x = new FastPriorityQueue();
    x.heapify([1]);

    var callback = function (val) {
      return true;
    }

    var removedItems = x.removeMany(callback);
    if (removedItems.length !== 1 || x.size !== 0) throw 'bug';
  });

  it('removeMany remove all - more than one item', function() {
    var x = new FastPriorityQueue();
    x.heapify([1,2]);

    var callback = function (val) {
      return true;
    }

    var removedItems = x.removeMany(callback);
    if (removedItems.length !== 2 || x.size !== 0) {
      console.log('removed: ' + JSON.stringify(removedItems));
      console.log('remaining:');
      while (!x.isEmpty()) {
        console.log(x.poll());
      }
      throw 'bug';
    }
  });

  it('Random', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        b.add(Math.floor(random() * 1000000 + 1));
      }
      var v = 0;
      while (!b.isEmpty()) {
        var nv = b.poll();
        if (nv < v) throw 'bug';
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
        var val = Math.floor(random() * 1000000 + 1);
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
        var val = Math.floor(random() * 1000000 + 1);
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
        var val = Math.floor(random() * 1000000 + 1);
        b.add(val);
        array.push(val);
        array.sort(function(a, b) {
          return b - a;
        });
      }
    }
  });

  it('should return k smallest', function() {
    // ascending
    var x = new FastPriorityQueue(function(a, b) {
      return a < b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    x.add(7);
    x.add(4.5);
    x.add(12);
    x.add(3.223);
    x.add(1.2);
    x.add(2.22);
    x.add(0.003);

    var iterOrder = [0, 0.003, 1, 1.2, 2.22, 3, 3.223, 4, 4.5, 5, 7, 12];

    // first iterate without mutating the queue
    checkOrderNonVolatile(x, iterOrder);

    // check k smallest for k = 0 ... n
    for (var i = 0; i < x.size; i++) if (JSON.stringify(x.kSmallest(i)) !== JSON.stringify(iterOrder.slice(0,i))) throw 'bug';

    // then iterate via polling
    for (var i = 0; i < iterOrder.length; i++) {
      var item = iterOrder[i];
      if (x.poll() != item) throw 'bug';
    }
  });
});
