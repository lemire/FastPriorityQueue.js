/**
 * TypedPriorityQueue : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install typedpriorityqueue

         Running test program (in JavaScript):

         // var TypedPriorityQueue = require("typedpriorityqueue");// in node
         var x = new TypedPriorityQueue();
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
 */
"use strict";

// the provided comparator function should take a, b and return *true* when a < b
export class TypedPriorityQueue<T> {
    private array: T[];
    private size: number;
    private compare: (a: T, b: T) => boolean;

    constructor(comparator: (a: any, b: any) => boolean) {
        if (!(this instanceof TypedPriorityQueue)) return new TypedPriorityQueue(comparator);
        this.array = [];
        this.size = 0;
        this.compare = comparator || TypedPriorityQueue.defaultcomparator;
    }

    private static defaultcomparator<T>(a: T, b: T) {
        return a < b;
    };
    

    // Add an element the the queue
    // runs in O(log n) time
    public add(myval: T) {
        var i = this.size;
        this.array[this.size] = myval;
        this.size += 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            const ap = this.array[p];
            if (!this.compare(myval, ap)) {
                break;
            }
            this.array[i] = ap;
            i = p;
        }
        this.array[i] = myval;
    };

    // replace the content of the heap by provided array and "heapifies it"
    public heapify(arr: T[]) {
        this.array = arr;
        this.size = arr.length;
        var i;
        for (i = (this.size >> 1); i >= 0; i--) {
            this._percolateDown(i);
        }
    };

    // for internal use
    private _percolateUp(i: number) {
        var myval = this.array[i];
        while (i > 0) {
            const p = (i - 1) >> 1;
            const ap = this.array[p];
            if (!this.compare(myval, ap)) {
                break;
            }
            this.array[i] = ap;
            i = p;
        }
        this.array[i] = myval;
    };


    // for internal use
    private _percolateDown(i: number) {
        var size = this.size;
        var hsize = this.size >>> 1;
        var ai = this.array[i];
        while (i < hsize) {
            let l = (i << 1) + 1;
            const r = l + 1;
            let bestc = this.array[l];
            if (r < size) {
                if (this.compare(this.array[r], bestc)) {
                    l = r;
                    bestc = this.array[r];
                }
            }
            if (!this.compare(bestc, ai)) {
                break;
            }
            this.array[i] = bestc;
            i = l;
        }
        this.array[i] = ai;
    };

    // Look at the top of the queue (a smallest element)
    // executes in constant time
    //
    // Calling peek on an empty priority queue returns
    // the "undefined" value.
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
    //
    public peek() {
        if(this.size === 0) return undefined;
        return this.array[0];
    };

    // remove the element on top of the heap (a smallest element)
    // runs in logarithmic time
    //
    // If the priority queue is empty, the function returns the
    // "undefined" value.
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
    //
    // For long-running and large priority queues, or priority queues
    // storing large objects, you may  want to call the trim function
    // at strategic times to recover allocated memory.
    public poll() {
        if (this.size === 0) 
            return undefined;
        var ans = this.array[0];
        if (this.size > 1) {
            this.array[0] = this.array[--this.size];
            this._percolateDown(0 | 0);
        } else {
            this.size -= 1;
        }
        return ans;
    };


    // This function adds the provided value to the heap, while removing
    //  and returning the peek value (like poll). The size of the priority
    // thus remains unchanged.
    public replaceTop(myval: T) {
        if (this.size == 0) 
            return undefined;
        var ans = this.array[0];
        this.array[0] = myval;
        this._percolateDown(0 | 0);
        return ans;
    };


    // recover unused memory (for long-running priority queues)
    public trim() {
        this.array = this.array.slice(0, this.size);
    };

    // Check whether the heap is empty
    public isEmpty() {
        return this.size === 0;
    };
}

// // just for illustration purposes
// var main = function () {
//     // main code
//     var x = new TypedPriorityQueue<number>(function (a: number, b: number) {
//         return a < b;
//     });
//     x.add(1);
//     x.add(0);
//     x.add(5);
//     x.add(4);
//     x.add(3);
//     while (!x.isEmpty()) {
//         console.log(x.poll());
//     }
// };