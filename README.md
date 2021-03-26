# FastPriorityQueue.js : a fast, heap-based priority queue in JavaScript

[![Build Status](https://travis-ci.org/lemire/FastPriorityQueue.js.png)](https://travis-ci.org/lemire/FastPriorityQueue.js)

In a priority queue, you can...

* query or remove (poll) the smallest element quickly
* insert elements quickly

In practice, "quickly" often means in logarithmic time (O(log n)).

A heap can be used to implement a priority queue.

FastPriorityQueue is an attempt to implement a performance-oriented priority queue
in JavaScript. It can be several times faster than other similar libraries.
It is ideal when performance matters.

License: Apache License 2.0

# Usage

```javascript
var x = new FastPriorityQueue();
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
x.peek(); // should return 0, leaves x unchanged
x.size; // should return 5, leaves x unchanged
while (!x.isEmpty()) {
  console.log(x.poll());
} // will print 0 1 3 4 5
x.trim(); // (optional) optimizes memory usage
```

You can also provide the constructor with a comparator function.

```javascript
var x = new FastPriorityQueue(function(a, b) {
  return a > b;
});
x.add(1);
x.add(0);
x.add(5);
x.add(4);
x.add(3);
while (!x.isEmpty()) {
  console.log(x.poll());
} // will print 5 4 3 1 0
```

If you are using node.js, you need to import the module:

```javascript
var FastPriorityQueue = require('fastpriorityqueue');
var b = new FastPriorityQueue(); // initially empty
b.add(1); // add the value "1"
```

Instance methods summary:

* `add(value)`: add an element into the queue; runs in `O(log n)` time.
* `poll()`: remove and return the element on top of the heap (smallest element); runs in `O(log n)` time. If the priority queue is empty, the function returns `undefined`.
* `remove(value)`: remove an element matching the provided value, if found, from the queue. The item is matched by using the queue's comparator. Returns `true` if the element is removed, `false` otherwise.
* `removeOne(callback)`: execute the callback function for each item of the queue and remove the first item for which the callback will return true. Returns the removed item, or `undefined` if nothing is removed. The callback must be a pure function.
* `removeMany(callback[, limit])`: execute the callback function for each item of the queue and remove each item for which the callback will return true, up to a max limit of removed items if specified or no limit if unspecified. Returns an array containing the removed items. The callback must be a pure function.
* `replaceTop(value)`: `poll()` and `add(value)` in one operation. This is useful for [fast, top-k queries](http://lemire.me/blog/2017/06/21/top-speed-for-top-k-queries/). Returns the removed element or `undefined`, similar to `poll()`.
* `heapify(array)`: replace the content of the heap with the provided array, then order it based on the comparator.
* `peek()`: return the top of the queue (smallest element) without removal, or `undefined` if the queue is empty; runs in `O(1)` time.
* `isEmpty()`: return `true` if the the queue has no elements, false otherwise.
* `clone()`: copy the priority queue into another, and return it. Queue items are shallow-copied. Runs in `O(n)` time.
* `forEach(callback)`: iterate over all items in the priority queue from smallest to largest. `callback` should be a function that accepts two arguments, `value` (the item), and `index`, the zero-based index of the item.
* `trim()`: clean up unused memory in the heap; useful after high-churn operations like many `add()`s then `remove()`s.

# npm install

      $ npm install fastpriorityqueue

# Computational complexity

The function calls "add" and "poll" have logarithmic complexity with respect
to the size of the data structure (attribute size). Looking at the top value
is a constant time operation.

# Testing

Using node.js (npm), you can test the code as follows...

      $ npm install mocha
      $ npm test

# Is it faster?

It tends to fare well against the competition.
In some tests, it can be five times faster than any other
JavaScript implementation we could find.

```
$ node benchmark/test.js
Platform: darwin 20.1.0 x64
Intel(R) Core(TM) i9-9980HK CPU @ 2.40GHz
Node version 14.7.0, v8 version 8.4.371.19-node.12

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue 0.1.5
stablepriorityqueue: https://github.com/lemire/StablePriorityQueue.js 0.1.2
heap.js: https://github.com/qiao/heap.js 0.2.6
binaryheapx: https://github.com/xudafeng/BinaryHeap 0.1.1
priority_queue: https://github.com/agnat/js_priority_queue 0.1.3
js-heap: https://github.com/thauburger/js-heap 0.3.1
queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS 1.0.0
priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs 2.0.0
qheap: https://github.com/andrasq/node-qheap 1.4.0
yabh: https://github.com/jmdobry/yabh 1.2.0

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 36,816 ops/sec ±0.74% (92 runs sampled)
FastPriorityQueue---replaceTop x 107,942 ops/sec ±0.71% (91 runs sampled)
sort x 6,240 ops/sec ±1.65% (92 runs sampled)
StablePriorityQueue x 10,333 ops/sec ±4.09% (91 runs sampled)
js-priority-queue x 14,435 ops/sec ±1.97% (91 runs sampled)
heap.js x 6,568 ops/sec ±2.29% (90 runs sampled)
binaryheapx x 8,595 ops/sec ±0.56% (94 runs sampled)
priority_queue x 8,201 ops/sec ±0.74% (94 runs sampled)
js-heap x 557 ops/sec ±1.70% (89 runs sampled)
queue-priority x 291 ops/sec ±2.46% (88 runs sampled)
priorityqueuejs x 13,864 ops/sec ±2.02% (90 runs sampled)
qheap x 26,882 ops/sec ±1.81% (93 runs sampled)
yabh x 10,472 ops/sec ±1.50% (93 runs sampled)
Fastest is FastPriorityQueue
```

Benchmarks on an Apple M1:
```
Platform: darwin 20.2.0 arm64
Apple M1
Node version 15.6.0, v8 version 8.6.395.17-node.23

Comparing against:
js-priority-queue: https://github.com/adamhooper/js-priority-queue 0.1.5
stablepriorityqueue: https://github.com/lemire/StablePriorityQueue.js 0.1.2
heap.js: https://github.com/qiao/heap.js 0.2.6
binaryheapx: https://github.com/xudafeng/BinaryHeap 0.1.1
priority_queue: https://github.com/agnat/js_priority_queue 0.1.3
js-heap: https://github.com/thauburger/js-heap 0.3.1
queue-priority: https://github.com/augustohp/Priority-Queue-NodeJS 1.0.0
priorityqueuejs: https://github.com/janogonzalez/priorityqueuejs 2.0.0
qheap: https://github.com/andrasq/node-qheap 1.4.0
yabh: https://github.com/jmdobry/yabh 1.2.0

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 47,894 ops/sec ±0.19% (100 runs sampled)
FastPriorityQueue---replaceTop x 187,809 ops/sec ±0.09% (97 runs sampled)
sort x 9,285 ops/sec ±0.10% (100 runs sampled)
StablePriorityQueue x 19,830 ops/sec ±0.49% (97 runs sampled)
js-priority-queue x 28,382 ops/sec ±0.10% (98 runs sampled)
heap.js x 5,504 ops/sec ±0.22% (100 runs sampled)
binaryheapx x 10,473 ops/sec ±0.11% (98 runs sampled)
priority_queue x 9,041 ops/sec ±0.33% (97 runs sampled)
js-heap x 390 ops/sec ±0.04% (96 runs sampled)
queue-priority x 438 ops/sec ±0.09% (95 runs sampled)
priorityqueuejs x 14,797 ops/sec ±0.07% (101 runs sampled)
qheap x 38,108 ops/sec ±0.12% (99 runs sampled)
yabh x 14,942 ops/sec ±0.24% (99 runs sampled)
```

Note that `qheap` has been updated following the introduction of `FastPriorityQueue`, with a reference to `FastPriorityQueue` which might explains the fact that its performance is comparable to `FastPriorityQueue`.

# Insertion order

A binary heap does not keep track of the insertion order.

# You might also like...

If you like this library, you might also like

* https://github.com/lemire/FastBitSet.js
* https://github.com/lemire/StablePriorityQueue.js
* https://github.com/lemire/FastIntegerCompression.js
