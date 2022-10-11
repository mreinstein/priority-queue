## 0.2.0
* BREAKING: queue(...) requires priority as the 3rd argument, no longer optional
* BREAKING: comparator functions are removed. They are confusing and error-prone. Just pass a simple priority value instead
* BREAKING: priority-queue is now always a max-heap,(i.e.,dequeue(...) always returns highest priority item.) If you want a min-heap, use negative priority values.
* fix issue #2
* add fuzz testing
* update mocha dep


## 0.1.0
* package maintenance taken over by mreinstein
* BREAKING: complete re-write of the priority queue

## 0.0.1
* initial implementation
