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
x.trim(); // (optional) optimizes memory usage
```

You can also provide the constructor with a comparator function.


```javascript
var x = new FastPriorityQueue(function(a,b) {return a > b});
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
while(!x.isEmpty()) {
  console.log(x.poll());
} // will print 5 4 3 1 0 
```

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

It tends to fare well against the competition.
In some tests, it can be five times faster than any other 
JavaScript implementation we could find.

```
$ node test.js
Platform: linux 4.4.0-38-generic x64
Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz
Node version 4.5.0, v8 version 4.5.103.37

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue 0.1.5
heap.js: https://github.com/qiao/heap.js 0.2.6
binaryheapx: https://github.com/xudafeng/BinaryHeap 0.1.1
priority_queue: https://github.com/agnat/js_priority_queue 0.1.3
js-heap: https://github.com/thauburger/js-heap 0.3.1
queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS 1.0.0
priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs 1.0.0
qheap: https://github.com/andrasq/node-qheap 1.3.0
yabh: https://github.com/jmdobry/yabh 1.2.0

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 36,813 ops/sec ±0.15% (98 runs sampled)
js-priority-queue x 5,374 ops/sec ±0.29% (97 runs sampled)
heap.js x 7,525 ops/sec ±0.21% (94 runs sampled)
binaryheapx x 4,741 ops/sec ±0.19% (98 runs sampled)
priority_queue x 3,657 ops/sec ±2.37% (92 runs sampled)
js-heap x 271 ops/sec ±0.35% (90 runs sampled)
queue-priority x 455 ops/sec ±0.44% (90 runs sampled)
priorityqueuejs x 7,012 ops/sec ±0.14% (75 runs sampled)
qheap x 36,289 ops/sec ±0.33% (97 runs sampled)
yabh x 3,975 ops/sec ±3.57% (76 runs sampled)
Fastest is FastPriorityQueue
```

Note that ``qheap`` has been updated following the introduction of ``FastPriorityQueue``, with a reference to ``FastPriorityQueue`` which might explains the fact that its performance is comparable to ``FastPriorityQueue``.

Insertion order
===

A binary heap does not keep track of the insertion order. 

You might also like...
===

If you like this library, you might also like
- https://github.com/lemire/FastBitSet.js
- https://github.com/lemire/StablePriorityQueue.js
- https://github.com/lemire/FastIntegerCompression.js
