/* performance benchmark */
/* This script expects node.js */

"use strict";

var FastPriorityQueue = require("../FastPriorityQueue.js");
var PriorityQueue = require("js-priority-queue");
var Heap = require('heap');
var Benchmark = require('benchmark');
var os = require('os');


function CreateBench() {
    console.log("starting priority queue creation benchmark");
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastPriorityQueue (add)', function() {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 1024  ; i++) {
            b.add((33*i+5)%55);
        }
        return b;
    }  )

    .add('js-priority-queue', function() {
        var b = new PriorityQueue({ comparator: function(a, b) {
            return b - a;
        }
                                  });
        for(var i = 0 ; i < 1024  ; i++) {
            b.queue((33*i+5)%55);
        }
        return b;
    }  )

    .add('heap.js', function() {
        var b = new Heap(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 1024  ; i++) {
            b.push((33*i+5)%55);
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

function HugeQueueEnqueueBench() {
    console.log("starting dynamic huge queue/enqueue benchmark");
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastPriorityQueue', function() {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 12000  ; i++) {
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
        for(var i = 0 ; i < 12000  ; i++) {
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
        for(var i = 0 ; i < 12000  ; i++) {
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



function QueueEnqueueBench() {
    console.log("starting dynamic queue/enqueue benchmark");
    var suite = new Benchmark.Suite();
    // add tests
    var ms = suite.add('FastPriorityQueue', function() {
        var b = new FastPriorityQueue(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 128  ; i++) {
            b.add((3*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.add((3*i+5)%1024);
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
            b.queue((3*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.queue((3*i+5)%1024);
            b.dequeue();
        }
        return b;
    }  )
    .add('heap.js', function() {
        var b = new Heap(function(a, b) {
            return a - b;
        });
        for(var i = 0 ; i < 128  ; i++) {
            b.push((3*i+5)%1024);
        }
        for(i = 128 ; i < 128 * 10  ; i++) {
            b.push((3*i+5)%1024);
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
    console.log("Platform: "+process.platform+" "+os.release()+" "+process.arch);
    console.log(os.cpus()[0]["model"]);
    console.log("Node version "+process.versions.node+", v8 version "+process.versions.v8);
    console.log();
    console.log("Comparing againsts: ");
    console.log("js-priority-queue: https://github.com/adamhooper/js-priority-queue");
    console.log("heap.js: https://github.com/qiao/heap.js");
    console.log("");
    TinyQueueEnqueueBench();
    console.log("");
    HugeQueueEnqueueBench();
    console.log("");
    QueueEnqueueBench();
    console.log("");
    CreateBench();
}

if (require.main === module) {
    main();
}
