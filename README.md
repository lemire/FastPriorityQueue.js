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
