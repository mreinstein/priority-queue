import PQ     from './priority-queue.js'
import assert from 'assert'


// a is parent b is child
// sort in descending order
function comparator (a, b) {
  return a < b ? true : false // swap true
}


// used for custom object testing
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



describe('test', () => {
  it('basic test', () => {
	  const obj = PQ.create(comparator)
    PQ.queue(obj, 'd', 1)
    PQ.queue(obj, 'a', 4)
    PQ.queue(obj, 'b', 3)
    PQ.queue(obj, 'c', 2)

    assert.equal(PQ.dequeue(obj).val, 'a')
    assert.equal(PQ.dequeue(obj).val, 'b')
    assert.equal(PQ.dequeue(obj).val, 'c')
    assert.equal(PQ.dequeue(obj).val, 'd')
    assert.equal(PQ.dequeue(obj), undefined)
  })

  it('if queue is empty then dequeue undefined', () => {
    const obj = PQ.create(comparator)
    assert.equal(PQ.dequeue(obj), undefined)
  })


  it('accepts 0 and negative numbers as valid values', () => {
    const obj = PQ.create(comparator)

    PQ.queue(obj, -1, 1)
    PQ.queue(obj, 0, 4)
    PQ.queue(obj, -5, 3)

    assert.equal(PQ.dequeue(obj).val, 0)
    assert.equal(PQ.dequeue(obj).val, -5)
    assert.equal(PQ.dequeue(obj).val, -1)
  })


  it('re-prioritizes an existing element if it is in the queue', () => {
    const obj = PQ.create(comparator)

    PQ.queue(obj, 'd', 1)
    PQ.queue(obj, 'a', 4)
    PQ.queue(obj, 'b', 3)

    PQ.queue(obj, 'b', 6)

    assert.equal(PQ.dequeue(obj).val, 'b')
    assert.equal(PQ.dequeue(obj).val, 'a')
    assert.equal(PQ.dequeue(obj).val, 'd')
  })
  

  it('throw an error if we try to delete a key that doesnt exist', () => {
    const obj = PQ.create(comparator)
    assert.throws(() => { PQ.delete(obj, '3') }, /^Error/) //delete key that doesnt exist
  })

  
  it('should delete before updating priority', () => {
    const obj = PQ.create(comparator)
    PQ.queue(obj, 'e', 3)
    PQ.queue(obj, 'b', 1)
    PQ.queue(obj, 'a', 2) //max priority

    PQ.delete(obj, 'a') //so we delete 
    PQ.queue(obj, 'a', 5)
    assert.equal(PQ.dequeue(obj).val, 'a')
    assert.equal(PQ.dequeue(obj).val, 'e')
    assert.equal(PQ.dequeue(obj).val, 'b')
  })

  it('check if queue is empty', () => {
    const obj = PQ.create(comparator)
    assert.equal(PQ.isEmpty(obj), true)
  })

  it('clear the queue', () => {
    const obj = PQ.create(comparator)
    PQ.queue(obj, 'a', 5)
    assert.equal(PQ.isEmpty(obj), false)
    PQ.clear(obj)
    assert.equal(PQ.isEmpty(obj), true)
  })

  it('list the contents of the queue', () => {
    const obj = PQ.create(comparator)
    PQ.queue(obj, 'c', 1)
    PQ.queue(obj, 'b', 3)
    PQ.queue(obj, 'a', 5)
    assert.equal(obj.length, 3)
    assert.deepEqual(PQ.list(obj).slice(0, 3), [ { val: 'a', priority: 5 },
    { val: 'c', priority: 1 },
    { val: 'b', priority: 3 }])
  })

  it('should peek content of queue', () => {
    const obj = PQ.create(comparator)
    PQ.queue(obj, 'c', 1)
    PQ.queue(obj, 'b', 3)

    assert.deepEqual(PQ.peek(obj), { val:'b', priority: 3 })
  })


  describe('test with an object', () => {
    it('basic test', () => {
      const obj = PQ.create(Box.prototype.comparator)
      const a = new Box(5, 5)
      const b = new Box(2, 3)
      const c = new Box(3, 3)
      const d = new Box(9, 9)
      PQ.queue(obj, a)
      PQ.queue(obj, b)
      PQ.queue(obj, c)
      PQ.queue(obj, d)

      assert.deepEqual(PQ.peek(obj), d)
      assert.deepEqual(PQ.dequeue(obj), d)
      assert.deepEqual(PQ.dequeue(obj), a)
      assert.deepEqual(PQ.dequeue(obj), c)
      assert.deepEqual(PQ.dequeue(obj), b)
    })

    it('test peek', () => {
      const obj = PQ.create(Box.prototype.comparator)
      PQ.queue(obj, new Box(5, 5))
      PQ.queue(obj, new Box(9, 9))

      assert.deepEqual(PQ.peek(obj), new Box(9, 9))
    })

    it('throw an error if we try to add a duplicate element in queue', () => {
      const obj = PQ.create(comparator)
      const a = new Box(5, 5)
      PQ.queue(obj, a)
    })

    it('throw an error if we try to delete a key that doesnt exist', () => {
      const obj = PQ.create(comparator)
      const a = new Box(15, 5)
      PQ.queue(obj, a)
      assert.throws(() => { PQ.delete(obj, new Box(15, 51)) }, /^Error/) //delete key that doesnt exist
    })

    it('should delete before updating priority', () => {
      const obj = PQ.create(comparator)
      const a = new Box(2, 3)

      PQ.queue(obj, new Box(5, 5))
      PQ.queue(obj, a)
      PQ.queue(obj, new Box(3, 3))
      PQ.delete(obj, a) // so we delete 
      
      assert(!PQ.list(obj).includes(a))

      PQ.queue(obj, a)
      assert.deepEqual(PQ.list(obj)[2], a)
    })

  })
})
