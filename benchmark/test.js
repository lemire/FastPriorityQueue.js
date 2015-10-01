/* performance benchmark */
/* This script expects node.js */

"use strict";

var FastPriorityQueue = require("../FastPriorityQueue.js");
var PriorityQueue = require("js-priority-queue");
var Heap = require('heap');
var Benchmark = require('benchmark');
var os = require('os');
var binaryheapx = require('binaryheapx').Constructor;
var pq = require('priority_queue');
var jsHeap = require('js-heap');

function basictest() {
    var b1 = new FastPriorityQueue(function(a, b) {
        return a - b;
    });
    var b2 = new Heap(function(a, b) {
        return a - b;
    });
    for(var i = 0 ; i < 2000  ; i++) {
        b1.add((33*i+5)%1024);
        b2.push((33*i+5)%1024);
    }
    for(i = 128 ; i < 128 * 10  ; i++) {
        b1.add((33*i+5)%1024);
        b2.push((33*i+5)%1024);
        var x1 = b1.poll();
        var x2 = b2.pop();
        if(x1 != x2) throw "bug "+x1+" "+x2;
    }

}

function QueueEnqueueBench() {
    console.log("starting dynamic queue/enqueue benchmark");
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite
    .add('FastPriorityQueue', function() {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 128  ; i++) {
            b.add((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.add((33*i+5)%1024);
            b.poll();
        }
        return b;
    }  )

    .add('js-priority-queue', function() {
        var b = new PriorityQueue({ comparator: function(a, b) {
            return b - a;
        }
                                  });
        for(var i = 0 ; i < 128  ; i++) {
            b.queue((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.queue((33*i+5)%1024);
            b.dequeue();
        }
        return b;
    }  )
    .add('heap.js', function() {
        var b = new Heap(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 128  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    .add('binaryheapx', function() {
        var b = new binaryheapx();
        for(var i = 0 ; i < 128  ; i++) {
            b.add((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.add((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    .add('priority_queue', function() {
        var b = new pq.PriorityQueue();
        for(var i = 0 ; i < 128  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.shift();
        }
        return b;
    }  )
    .add('js-heap', function() {
        var b = new jsHeap();
        for(var i = 0 ; i < 128  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}



function TinyQueueEnqueueBench() {
    console.log("starting dynamic tiny queue/enqueue benchmark");
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastPriorityQueue', function() {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 12  ; i++) {
            b.add((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.add((33*i+5)%1024);
            b.poll();
        }
        return b;
    }  )

    .add('js-priority-queue', function() {
        var b = new PriorityQueue({ comparator: function(a, b) {
            return b - a;
        }
                                  });
        for(var i = 0 ; i < 12  ; i++) {
            b.queue((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.queue((33*i+5)%1024);
            b.dequeue();
        }
        return b;
    }  )
    .add('heap.js', function() {
        var b = new Heap(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 12  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    .add('binaryheapx', function() {
        var b = new binaryheapx();
        for(var i = 0 ; i < 12  ; i++) {
            b.add((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.add((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    .add('priority_queue', function() {
        var b = new pq.PriorityQueue();
        for(var i = 0 ; i < 12  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.shift();
        }
        return b;
    }  )
    .add('js-heap', function() {
        var b = new jsHeap();
        for(var i = 0 ; i < 12  ; i++) {
            b.push((33*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((33*i+5)%1024);
            b.pop();
        }
        return b;
    }  )
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': false });
}




var main = function() {
    basictest();
    console.log("Platform: "+process.platform+" "+os.release()+" "+process.arch);
    console.log(os.cpus()[0]["model"]);
    console.log("Node version "+process.versions.node+", v8 version "+process.versions.v8);
    console.log();
    console.log("Comparing against: ");
    console.log("js-priority-queue: https://github.com/adamhooper/js-priority-queue");
    console.log("heap.js: https://github.com/qiao/heap.js");
    console.log("binaryheapx: https://github.com/xudafeng/BinaryHeap");
    console.log("priority_queue: https://github.com/agnat/js_priority_queue");
    console.log("js-heap: https://github.com/thauburger/js-heap");
    console.log("");
    QueueEnqueueBench();
    console.log("");
    TinyQueueEnqueueBench();
    console.log("");
}

if (require.main === module) {
    main();
}
