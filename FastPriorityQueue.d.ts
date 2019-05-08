declare class FastPriorityQueue<T> {
  /** The provided comparator function should take a, b and return *true* when a < b. */
  constructor(comparator?: (a: T, b: T) => boolean);
  /** Add an element into the queue. Runs in O(log n) time. */
  add: (value: T) => void;
  /** Copy the priority queue into another, and return it. Queue items are shallow-copied. Runs in `O(n)` time. */
  clone: () => FastPriorityQueue<T>;
  /** Iterate over the items in order. */
  forEach: (callback: (value: T, index: number) => void) => void;
  /** Replace the content of the heap by provided array and "heapify it." */
  heapify: (array: T[]) => void;
  /** Check whether the heap is empty. */
  isEmpty: () => boolean;
  /** Look at the top of the queue (the smallest element) without removing it. Executes in constant time. */
  peek: () => T | undefined;
  /** Remove the element on top of the heap (the smallest element). Runs in logarithmic time */
  poll: () => T | undefined;
  /** Remove an element matching the provided value from the queue, checked for equality by using the queue's comparator. Return true if removed, false otherwise. */
  remove: (value: T) => boolean;
  /** Remove the first item for which the callback will return true. Return the removed item, or undefined if nothing is removed. */
  removeMany: (callback: (a: T) => boolean, limit?: number) => T[];
  /**
   * Remove each item for which the callback returns true, up to a max limit of removed items if specified or no limit if unspecified.
   * Return an array containing the removed items.
   */
  removeOne: (callback: (a: T) => boolean) => T | undefined;
  /** Add the provided value to the heap while removing and returning the smallest value. The size of the queue thus remains unchanged. */
  replaceTop: (value: T) => T | undefined;
  /** The number of elements in the queue. */
  size: number;
  /** Recover unused memory (for long-running priority queues). */
  trim: () => void;
  /** return the k 'smallest' elements of the queue */
  kSmallest: (k: number) => T[];
}

export = FastPriorityQueue;
