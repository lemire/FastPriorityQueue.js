# FastPriorityQueue.js : a fast heap-based priority queue in JavaScript
[![Build Status](https://travis-ci.org/lemire/FastPriorityQueue.js.png)](https://travis-ci.org/lemire/FastPriorityQueue.js)

A heap can be used to implement a priority queue. At all times, you can insert
elements quickly in a heap, and query the smallest element. You remove (poll)
the smallest element quickly as well.

FastPriorityQueue is an attempt to implement a performance-oriented priority queue
in JavaScript. It can be several times faster than other similar libraries.
It is ideal when performance matters.

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
x.peek(); // should return 0, leaves x unchanged
x.size; // should return 5, leaves x unchanged
while(!x.isEmpty()) {
  console.log(x.poll());
} // will print 0 1 4 4 5
```

You can also provide the constructor with a comparator function.

If you are using node.js, you need to import the module:

```javascript
var FastPriorityQueue = require("FastPriorityQueue");
var b = new FastPriorityQueue();// initially empty
b.add(1);// add the value "1"
```
npm install
===

      $ npm install fastpriorityqueue

Computational complexity
===

The function calls "add" and "poll" have logarithmic complexity with respect
to the size of the data structure (attribute size). Looking at the top value
is a constant time operation.



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
FastPriorityQueue x 19,345 ops/sec ±0.35% (102 runs sampled)
js-priority-queue x 4,760 ops/sec ±0.26% (101 runs sampled)
heap.js x 6,453 ops/sec ±0.31% (103 runs sampled)
binaryheapx x 4,330 ops/sec ±0.22% (102 runs sampled)
priority_queue x 3,465 ops/sec ±0.68% (101 runs sampled)
js-heap x 505 ops/sec ±0.05% (98 runs sampled)
Fastest is FastPriorityQueue

starting dynamic tiny queue/enqueue benchmark
FastPriorityQueue x 37,769 ops/sec ±0.26% (103 runs sampled)
js-priority-queue x 11,502 ops/sec ±0.43% (103 runs sampled)
heap.js x 10,429 ops/sec ±0.24% (102 runs sampled)
binaryheapx x 10,386 ops/sec ±0.25% (104 runs sampled)
priority_queue x 3,886 ops/sec ±6.79% (72 runs sampled)
js-heap x 1,148 ops/sec ±0.18% (101 runs sampled)
Fastest is FastPriorityQueue
```

You might also like...
===

If you like this library, you might also like
https://github.com/lemire/FastBitSet.js
