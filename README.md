# priority-queue

functional, data oriented priority queue that doesn't suck

[![Build Status](https://travis-ci.org/mreinstein/priority-queue.svg?branch=main)](https://travis-ci.org/mreinstein/priority-queue)


There are many priority queue implementations on the web, but I couldn't find any that meet these critera:

* **does not allocate memory at run time**
* has tests
* is functional, data oriented
* is tiny! (~150 lines of code)
* is a pure ES module


So here we are!


## Usage

```javascript
import PQ from 'priority-queue'


// declarea a custom function for comparing the priority values of 2 items in the queue
function comparator (a, b) {
  return a < b ? true : false
}

// create a new priority queue that can hold a maximum of 20,000 items.
// by default max length is 1000
const MAX_LENGTH = 20000
const obj = PQ.create(comparator, MAX_LENGTH)


// insert a few items
PQ.queue(obj, 'e', 1)
PQ.queue(obj, 'f', 9)
PQ.queue(obj, 'g', 4)

// get the highest priority item out of the queue
console.log(PQ.dequeue(obj)) // 'f'
console.log(PQ.dequeue(obj)) // 'g'
console.log(PQ.dequeue(obj)) // 'e'

// when the queue is empty it'll return undefined on dequeue
console.log(PQ.dequeue(obj)) // undefined

```


By default dequeue will return the highest prioritied item in the queue first.
If you want to get the lowest priority item instead, pass a 3rd boolean argument:

```javascript
const highest = PQ.dequeue(obj)

GET_HIGHEST = false
const lowest = PQ.dequeue(obj, GET_HIGHEST)
```


## API

* `queue` - add an element to the queue
* `dequeue` - delete the max priority element from the queue
* `isEmpty` - returns true/false
* `clear` - clear the queue
* `delete` - If we need to update the priority, delete that item and insert it in again
* `list` - contents of heap

The Item stored in the queue should be class and a comparator should be provided.


### If values in a queue are strings, comparator will receive priorities as a and b in the example below
We need max priority element to be removed first.

```javascript
const comparator = function (a, b) {
  return a >= b ? false : true
}
```

An example would be:
```javascript
const obj = PriorityQueue.create(comparator)
PQ.queue(obj, 'c', 1)
PQ.queue(obj, 'b', 3)
PQ.queue(obj, 'a', 5)

console.log(PQ.dequeue(obj)) //'a'
```


### If values in the queue is an object, comparator will receive the object and you need to compare priorities

```javascript
class Box {
  constructor(w, l) {
    this.w = w
    this.l = l
    this.area = w * l //this is priority
  }

  comparator(a, b) {
    return a.area >= b.area ? false : true
  }
}
    
const obj = PQ.create(Box.prototype.comparator)
const a = new Box(5, 5)
const b = new Box(9, 9)
PQ.queue(obj, a)
PQ.queue(obj, new Box(2, 3))
PQ.queue(obj, new Box(3, 3))
PQ.queue(obj, b)

assert.deepEqual(PQ.dequeue(obj), b)
assert.deepEqual(PQ.dequeue(obj), a)
```

