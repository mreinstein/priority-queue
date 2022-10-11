# priority-queue

functional, data oriented priority queue that doesn't suck

![tests](https://github.com/mreinstein/priority-queue/actions/workflows/main.yml/badge.svg)


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


// create a new priority queue that can hold a maximum of 20,000 items.
// by default max length is 1000
const MAX_LENGTH = 20000
const obj = PQ.create(MAX_LENGTH)


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


## API

* `queue` - add an element to the queue
* `dequeue` - delete the max priority element from the queue
* `isEmpty` - returns true/false
* `clear` - clear the queue
* `delete` - If we need to update the priority, delete that item and insert it in again
* `list` - contents of heap


### Using classes/objects

```javascript
class Box {
  constructor(w, l) {
    this.w = w
    this.l = l
    this.area = w * l // this is priority
  }
}
    
const obj = PQ.create()
const a = new Box(5, 5)
const b = new Box(9, 9)
const c = new Box(2, 3)
const d = new Box(3, 3)

PQ.queue(obj, a, a.area)
PQ.queue(obj, c, c.area)
PQ.queue(obj, d, d.area)
PQ.queue(obj, b, b.area)

assert.deepEqual(PQ.dequeue(obj), b)
assert.deepEqual(PQ.dequeue(obj), a)
```
