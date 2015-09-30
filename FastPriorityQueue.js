/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         var x = new FastPriorityQueue(function(a, b) {
             return a - b;
         });
         x.add(1);
         x.add(0);
         x.add(5);
         x.add(4);
         x.add(3);
         while(!x.isEmpty()) {
           console.log(x.poll());
         }
 */
"use strict";

var defaultcomparator = function(a,b) {
    return (a == b) ? 0 : ((a > b) ? 1 : -1);
}

function FastPriorityQueue (comparator) {
    this.array = new Array();
    this.compare = (typeof comparator === 'function')
                   ?  comparator : defaultcomparator;
}

// Add an element the the queue
// runs in O(log n) time
FastPriorityQueue.prototype.add = function(myval) {
    this.array.push(myval);
    var i = this.array.length - 1;
    var p = (i - 1) >> 1;
    for (; (i > 0) && (this.compare(myval, this.array[p]) < 0); i = p, p = (i - 1) >> 1) {
        this.array[i] = this.array[p];
    }
    this.array[i] = myval;
}

// for internal use
FastPriorityQueue.prototype._percolateUp = function(i) {
    var myval = this.array[i];
    var p = (i - 1) >> 1;
    for (; (i > 0) && (this.compare(myval, this.array[p]) < 0); i = p, p = (i - 1) >> 1) {
        this.array[i] = this.array[p];
    }
    this.array[i] = myval;
}

// for internal use
FastPriorityQueue.prototype._percolateDown = function(i) {
    var size = this.array.length;
    var ai = this.array[i];
    var l = (i << 1) + 1;
    while (l < size) {
        var r = l + 1;
        var smallest = l;
        if(r < size) {
            if (this.compare(this.array[r], this.array[l]) < 0)
                smallest = r;
        }
        this.array[i] = this.array[smallest];
        i = smallest;
        l = (smallest << 1) + 1;
    }
    this.array[smallest] = ai;
    var p = (smallest - 1) >> 1;
    for (; (smallest > 0) && (this.compare( ai, this.array[p]) < 0); smallest = p, p = (smallest - 1) >> 1) {
        this.array[smallest] = this.array[p];
    }
};

//Look at the top of the queue (a smallest element)
// executes in constant time
FastPriorityQueue.prototype.peek = function(t) {
    return this.array[0];
}


// remove the element on top of the heap (a smallest element)
// runs in logarithmic time
FastPriorityQueue.prototype.poll = function(i) {
    var ans = this.array[0];
    if(this.array.length > 1) {
        this.array[0] = this.array.pop();
        this._percolateDown(0|0);
    } else  {
        this.array.pop();
    }
    return ans;
}

// Check whether the heap is empty
FastPriorityQueue.prototype.isEmpty = function(i) {
    return this.array.length == 0;
}

// Return the size of the heap
FastPriorityQueue.prototype.size = function(i) {
    return this.array.length;
}

// just for illustration purposes
var main = function() {
    // main code
    var x = new FastPriorityQueue(function(a, b) {
        return a - b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    while(!x.isEmpty()) {
        console.log(x.poll());
    }
}

if (require.main === module) {
    main();
}


module['exports'] = FastPriorityQueue;
