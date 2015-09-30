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

Comparing againsts:
js-priority-queue: https://github.com/adamhooper/js-priority-queue
heap.js: https://github.com/qiao/heap.js

starting dynamic queue/enqueue benchmark
FastPriorityQueue x 7,234 ops/sec ±0.35% (102 runs sampled)
js-priority-queue x 4,795 ops/sec ±0.23% (103 runs sampled)
heap.js x 6,341 ops/sec ±0.28% (103 runs sampled)
Fastest is FastPriorityQueue

starting priority queue creation benchmark
FastPriorityQueue (add) x 43,279 ops/sec ±0.29% (100 runs sampled)
js-priority-queue x 42,598 ops/sec ±0.55% (99 runs sampled)
heap.js x 33,873 ops/sec ±0.31% (101 runs sampled)
Fastest is FastPriorityQueue (add)
```
