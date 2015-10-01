# FastPriorityQueue.js : a fast heap-based priority queue in JavaScript
[![Build Status](https://travis-ci.org/lemire/FastPriorityQueue.js.png)](https://travis-ci.org/lemire/FastPriorityQueue.js)

A heap can be used to implement a priority queue. At all times, you can insert
elements quickly in a heap, and query the smallest element. You remove (poll)
the smallest element quickly as well.

FastPriorityQueue is an attempt to implement a performance-oriented priority queue
in JavaScript. It is ideal when performance matters.

License: Apache License 2.0



Usage
===

```javascript
var x = new FastPriorityQueue();
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
while(!x.isEmpty()) {
    console.log(x.poll());// output values starting from the smallest
}

// you can also provide a custom comparator:

var y = new FastPriorityQueue(function(a, b) {
    return a - b;
});
```

If you are using node.js, you need to import the module:

```javascript
var FastPriorityQueue = require("FastPriorityQueue");
var b = new FastPriorityQueue();// initially empty
b.add(1);// add the value "1"
```
npm install
===

      $ npm install fastpriorityqueue

Testing
===

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test

Is it faster?
===

It tends to fare well against the competition :

```
$ node test.js
Platform: linux 3.13.0-37-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 0.12.7, v8 version 3.28.71.19

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue
heap.js: https://github.com/qiao/heap.js
binaryheapx: https://github.com/xudafeng/BinaryHeap
priority_queue: https://github.com/agnat/js_priority_queue
js-heap: https://github.com/thauburger/js-heap

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 7,039 ops/sec ±0.09% (102 runs sampled)
js-priority-queue x 4,965 ops/sec ±0.44% (103 runs sampled)
heap.js x 6,488 ops/sec ±0.38% (102 runs sampled)
binaryheapx x 4,246 ops/sec ±0.19% (102 runs sampled)
priority_queue x 3,487 ops/sec ±0.66% (100 runs sampled)
js-heap x 512 ops/sec ±0.24% (99 runs sampled)
Fastest is FastPriorityQueue

starting dynamic tiny queue/enqueue benchmark
FastPriorityQueue x 14,131 ops/sec ±0.25% (104 runs sampled)
js-priority-queue x 10,731 ops/sec ±0.95% (100 runs sampled)
heap.js x 9,852 ops/sec ±0.13% (103 runs sampled)
binaryheapx x 9,477 ops/sec ±0.55% (103 runs sampled)
priority_queue x 4,117 ops/sec ±6.93% (79 runs sampled)
js-heap x 989 ops/sec ±0.40% (99 runs sampled)
Fastest is FastPriorityQueue

```
