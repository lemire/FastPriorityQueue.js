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
FastPriorityQueue x 27,047 ops/sec ±0.52% (97 runs sampled)
js-priority-queue x 4,789 ops/sec ±0.09% (103 runs sampled)
heap.js x 6,226 ops/sec ±0.05% (104 runs sampled)
binaryheapx x 4,232 ops/sec ±0.09% (103 runs sampled)
priority_queue x 2,915 ops/sec ±0.69% (91 runs sampled)
js-heap x 259 ops/sec ±0.09% (90 runs sampled)
queue-priority x 388 ops/sec ±0.43% (95 runs sampled)
priorityqueuejs x 6,245 ops/sec ±0.31% (100 runs sampled)
qheap x 6,144 ops/sec ±0.28% (103 runs sampled)
yabh x 4,665 ops/sec ±0.14% (100 runs sampled)
Fastest is FastPriorityQueue
```

You might also like...
===

If you like this library, you might also like
https://github.com/lemire/FastBitSet.js
