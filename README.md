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
} // will print 0 1 3 4 5
```

You can also provide the constructor with a comparator function.

If you are using node.js, you need to import the module:

```javascript
var FastPriorityQueue = require("fastpriorityqueue");
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
Node version 4.1.1, v8 version 4.5.103.33

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue
heap.js: https://github.com/qiao/heap.js
binaryheapx: https://github.com/xudafeng/BinaryHeap
priority_queue: https://github.com/agnat/js_priority_queue
js-heap: https://github.com/thauburger/js-heap
queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS
priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs
qheap: https://github.com/andrasq/node-qheap
yabh: https://github.com/jmdobry/yabh

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 20,498 ops/sec ±0.34% (102 runs sampled)
js-priority-queue x 4,777 ops/sec ±0.18% (103 runs sampled)
heap.js x 6,232 ops/sec ±0.15% (103 runs sampled)
binaryheapx x 4,237 ops/sec ±0.04% (103 runs sampled)
priority_queue x 3,023 ops/sec ±1.25% (94 runs sampled)
js-heap x 251 ops/sec ±0.28% (94 runs sampled)
queue-priority x 399 ops/sec ±0.49% (95 runs sampled)
priorityqueuejs x 6,220 ops/sec ±0.44% (100 runs sampled)
qheap x 6,313 ops/sec ±0.38% (103 runs sampled)
yabh x 4,544 ops/sec ±0.12% (101 runs sampled)
Fastest is FastPriorityQueue
```

You might also like...
===

If you like this library, you might also like
https://github.com/lemire/FastBitSet.js
