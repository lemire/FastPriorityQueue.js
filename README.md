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
$ node test.jsPlatform: linux 3.13.0-37-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 0.12.7, v8 version 3.28.71.19

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue
heap.js: https://github.com/qiao/heap.js
binaryheapx: https://github.com/xudafeng/BinaryHeap
priority_queue: https://github.com/agnat/js_priority_queue
js-heap: https://github.com/thauburger/js-heap
queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS
priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 19,780 ops/sec ±0.39% (103 runs sampled)
js-priority-queue x 4,983 ops/sec ±0.32% (103 runs sampled)
heap.js x 6,629 ops/sec ±0.36% (103 runs sampled)
binaryheapx x 4,298 ops/sec ±0.15% (102 runs sampled)
priority_queue x 3,450 ops/sec ±0.67% (101 runs sampled)
js-heap x 506 ops/sec ±0.17% (98 runs sampled)
queue-priority x 408 ops/sec ±0.79% (93 runs sampled)
priorityqueuejs x 6,268 ops/sec ±0.35% (103 runs sampled)
Fastest is FastPriorityQueue
```

You might also like...
===

If you like this library, you might also like
https://github.com/lemire/FastBitSet.js
