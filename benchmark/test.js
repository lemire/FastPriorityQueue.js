/* performance benchmark */
/* This script expects node.js */

'use strict';

var FastPriorityQueue = require('../FastPriorityQueue.js');
var PriorityQueue = require('js-priority-queue');
var Heap = require('heap');
var Stable = require('stablepriorityqueue');
var Benchmark = require('benchmark');
var os = require('os');
var binaryheapx = require('binaryheapx').Constructor;
var pq = require('priority_queue');
var jsHeap = require('js-heap');
var qp = require('queue-priority');
var priorityqueuejs = require('priorityqueuejs');
var qheap = require('qheap');
var BinaryHeap = require('yabh');

// very fast semi-random function
function rand(i) {
  i = i + 10000;
  i = i ^ (i << 16);
  i = (i >> 5) ^ i ;
  return i & 0xFF;
}
var defaultcomparator = function(a, b) {
  return a < b;
};

function basictest() {
  var b1 = new FastPriorityQueue(defaultcomparator);
  var b2 = new Heap(function(a, b) {
    return a - b;
  });
  for (var i = 0 ; i < 2000  ; i++) {
    b1.add(rand(i));
    b2.push(rand(i));
  }
  for (i = 128 ; i < 128 * 10  ; i++) {
    b1.add(rand(i));
    b2.push(rand(i));
    var x1 = b1.poll();
    var x2 = b2.pop();
    if (x1 != x2) throw 'bug ' + x1 + ' ' + x2;
  }

}

function QueueEnqueueBench(blocks) {
  console.log('starting dynamic queue/enqueue benchmark');
  var suite = new Benchmark.Suite();
  // add tests
  var b = new BinaryHeap();
  for (var i = 0 ; i < 128  ; i++) {
    b.push(rand(i));
  }
  for (i = 128 ; i < 128 * blocks ; i++) {
    b.push(rand(i));
    b.pop();
  }
     {
      var b = new FastPriorityQueue(defaultcomparator);
      for (var i = 0 ; i < 128  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.replaceTop(rand(i));
      }
    }
   
  var ms = suite
    .add('FastPriorityQueue', function() {
      var b = new FastPriorityQueue(defaultcomparator);
      for (var i = 0 ; i < 128  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.add(rand(i));
        b.poll();
      }
      return b;
    })
    .add('FastPriorityQueue---replaceTop', function() {
      var b = new FastPriorityQueue(defaultcomparator);
      for (var i = 0 ; i < 128  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.replaceTop(rand(i));
      }
      return b;
    })
    .add('FastPriorityQueue--queue-and-kSmallest', function() {
      var b = new FastPriorityQueue(defaultcomparator);
      for (var i = 0 ; i < 1280  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.kSmallest(i % 1300)
      }
      return b;
    })
    .add('FastPriorityQueue--queue-and-removeMany', function() {
      var b = new FastPriorityQueue(defaultcomparator);
      for (var i = 0 ; i < 1280  ; i++) {
        b.add(rand(i));
      }
      for (i = 0 ; i < 1300 ; i++) {
        var f = b.clone();
        f.removeMany(z => z > i, blocks * 30)
        var y = b.clone();
        y.removeMany(z => z < i, blocks * 30)
      }
      return b;
    })
     .add('sort', function() {
      var a = new Array();
      for (var i = 0 ; i < 128 * (blocks + 1)  ; i++) {
        a.push(rand(i));
      }
      a.sort(function(a, b) {
            return b - a; // in reverse
      });
      return a.slice(0,128);
    })
     .add('StablePriorityQueue', function() {
      var b = new Stable(function(a, b) {
        return b - a;
      });
      for (var i = 0 ; i < 128  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks ; i++) {
        b.add(rand(i));
        b.poll();
      }
      return b;
    })
   .add('js-priority-queue', function() {
      var b = new PriorityQueue({comparator: function(a, b) {
        return b - a;
      }
                                });
      for (var i = 0 ; i < 128  ; i++) {
        b.queue(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.queue(rand(i));
        b.dequeue();
      }
      return b;
    })
    .add('heap.js', function() {
      var b = new Heap(function(a, b) {
        return a - b;
      });
      for (var i = 0 ; i < 128  ; i++) {
        b.push(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.push(rand(i));
        b.pop();
      }
      return b;
    })
    .add('binaryheapx', function() {
      var b = new binaryheapx();
      for (var i = 0 ; i < 128  ; i++) {
        b.add(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.add(rand(i));
        b.pop();
      }
      return b;
    })
    .add('priority_queue', function() {
      var b = new pq.PriorityQueue();
      for (var i = 0 ; i < 128  ; i++) {
        b.push(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.push(rand(i));
        b.shift();
      }
      return b;
    })
    .add('js-heap', function() {
      var b = new jsHeap();
      for (var i = 0 ; i < 128  ; i++) {
        b.push(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.push(rand(i));
        b.pop();
      }
      return b;
    })
    .add('queue-priority', function() {
      var b = new qp();
      for (var i = 0 ; i < 128  ; i++) {
        b.push(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.push(rand(i));
        b.pop();
      }
      return b;
    })
    .add('priorityqueuejs', function() {
      var b = new priorityqueuejs();
      for (var i = 0 ; i < 128  ; i++) {
        b.enq(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.enq(rand(i));
        b.deq();
      }
      return b;
    })
    .add('qheap', function() {
      var b = new qheap();
      for (var i = 0 ; i < 128  ; i++) {
        b.insert(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.insert(rand(i));
        b.remove();
      }
      return b;
    })
    .add('yabh', function() {
      var b = new BinaryHeap();
      for (var i = 0 ; i < 128  ; i++) {
        b.push(rand(i));
      }
      for (i = 128 ; i < 128 * blocks  ; i++) {
        b.push(rand(i));
        b.pop();
      }
      return b;
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    // run async
    .run({'async': false});
}

var main = function() {
  basictest();
  console.log('Platform: ' + process.platform + ' ' + os.release() + ' ' + process.arch);
  console.log(os.cpus()[0]['model']);
  console.log('Node version ' + process.versions.node + ', v8 version ' + process.versions.v8);
  console.log();
  console.log('Comparing against: ');
  console.log('js-priority-queue: https://github.com/adamhooper/js-priority-queue', require("js-priority-queue/package.json").version);
  console.log('stablepriorityqueue: https://github.com/lemire/StablePriorityQueue.js', require("stablepriorityqueue/package.json").version);
  console.log('heap.js: https://github.com/qiao/heap.js', require("heap/package.json").version);
  console.log('binaryheapx: https://github.com/xudafeng/BinaryHeap', require("binaryheapx/package.json").version);
  console.log('priority_queue: https://github.com/agnat/js_priority_queue', require("priority_queue/package.json").version);
  console.log('js-heap: https://github.com/thauburger/js-heap', require("js-heap/package.json").version);
  console.log('queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS', require("queue-priority/package.json").version);
  console.log('priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs', require("priorityqueuejs/package.json").version);
  console.log('qheap: https://github.com/andrasq/node-qheap',  require("qheap/package.json").version);
  console.log('yabh: https://github.com/jmdobry/yabh',  require("yabh/package.json").version);
  console.log('');
  QueueEnqueueBench(10);
  console.log('');
  QueueEnqueueBench(100);
  console.log('');
};

if (require.main === module) {
  main();
}
