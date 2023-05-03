import PQ     from './priority-queue.js'
import assert from 'assert'


// used for custom object testing
class Box {
  constructor(w, l) {
    this.w = w
    this.l = l
    this.area = w * l //this is priority
  }
}


describe('test', () => {

  it('basic test', () => {
	  const obj = PQ.create()
    PQ.queue(obj, 'd', 1)
    PQ.queue(obj, 'a', 4)
    PQ.queue(obj, 'b', 3)
    PQ.queue(obj, 'c', 2)

    assert.equal(PQ.dequeue(obj), 'a')
   
    assert.equal(PQ.dequeue(obj), 'b')
    assert.equal(PQ.dequeue(obj), 'c')
    assert.equal(PQ.dequeue(obj), 'd')
    assert.equal(PQ.dequeue(obj), undefined)
  })

  it('if queue is empty then dequeue undefined', () => {
    const obj = PQ.create()
    assert.equal(PQ.dequeue(obj), undefined)
  })

  it('accepts 0 and negative numbers as valid values', () => {
    const obj = PQ.create()

    PQ.queue(obj, -1, 1)
    PQ.queue(obj, 0, 4)
    PQ.queue(obj, -5, 3)

    assert.equal(PQ.dequeue(obj), 0)
    assert.equal(PQ.dequeue(obj), -5)
    assert.equal(PQ.dequeue(obj), -1)
  })

  it('re-prioritizes an existing element if it is in the queue', () => {
    const obj = PQ.create()

    PQ.queue(obj, 'd', 1)
    PQ.queue(obj, 'a', 4)
    PQ.queue(obj, 'b', 3)

    PQ.queue(obj, 'b', 6)

    assert.equal(PQ.dequeue(obj), 'b')
    assert.equal(PQ.dequeue(obj), 'a')
    assert.equal(PQ.dequeue(obj), 'd')
  })
  
  it('throw an error if we try to queue with no priority', () => {
    const obj = PQ.create()
    assert.throws(() => { PQ.queue(obj, '3') }, /^Error/)
  })

  it('throw an error if we try to delete a key that doesnt exist', () => {
    const obj = PQ.create()
    assert.throws(() => { PQ.delete(obj, '3') }, /^Error/) // delete key that doesnt exist
  })


  it('should delete before updating priority', () => {
    const obj = PQ.create()
    PQ.queue(obj, 'e', 3)
    PQ.queue(obj, 'b', 1)
    PQ.queue(obj, 'a', 2) //max priority

    PQ.delete(obj, 'a') //so we delete 
    PQ.queue(obj, 'a', 5)
    assert.equal(PQ.dequeue(obj), 'a')
    assert.equal(PQ.dequeue(obj), 'e')
    assert.equal(PQ.dequeue(obj), 'b')
  })


  it('check if queue is empty', () => {
    const obj = PQ.create()
    assert.equal(PQ.isEmpty(obj), true)
  })

  it('clear the queue', () => {
    const obj = PQ.create()
    PQ.queue(obj, 'a', 5)
    assert.equal(PQ.isEmpty(obj), false)
    PQ.clear(obj)
    assert.equal(PQ.isEmpty(obj), true)
  })

  it('list the contents of the queue', () => {
    const obj = PQ.create()
    PQ.queue(obj, 'c', 1)
    PQ.queue(obj, 'b', 3)
    PQ.queue(obj, 'a', 5)
    assert.equal(obj.length, 3)
    assert.deepEqual(PQ.list(obj).slice(0, 3), [ 'a', 'c', 'b' ])
  })

  it('should peek content of queue', () => {
    const obj = PQ.create()
    PQ.queue(obj, 'c', 1)
    PQ.queue(obj, 'b', 3)

    assert.deepEqual(PQ.peek(obj), 'b')
  })

  it('github issue #3', () => {
    // this specific set of calls causes a crash
    const obj = PQ.create()
    PQ.queue(obj, 50, 0)
    PQ.dequeue(obj)
  
    PQ.queue(obj, 49, -208.01627535185656)
    PQ.queue(obj, 51, -210.25305660400815)
    PQ.dequeue(obj)
    PQ.queue(obj, 48, -224.8892169096033)
    PQ.dequeue(obj)
    
    PQ.queue(obj, 0, -248.46823429680552)

    PQ.queue(obj, 34, -228.26373397712936)
    PQ.queue(obj, 35, -239.23167864379525)
    PQ.queue(obj, 37, -266.89894250109546)
    PQ.queue(obj, 86, -349.68815199723747)
    PQ.queue(obj, 87, -365.64707670906125)

    PQ.queue(obj, 113, -320.62073398614984)
    PQ.queue(obj, 116, -420.20447008152644)
    PQ.queue(obj, 114, -297.2795767836452)
    
    PQ.queue(obj, 115, -275.62135818236425)
    PQ.queue(obj, 36, -252.2200007506263)
    PQ.queue(obj, 79, -252.54674757055753)
    PQ.queue(obj, 88, -382.0386737765449)
    PQ.queue(obj, 8, -311.2518915300308)
    PQ.dequeue(obj)

    PQ.queue(obj, 110, -369.64947731728694)
    
    PQ.queue(obj, 0, -245.463916203665)
  })

  describe('test with an object', () => {
    it('basic test', () => {
      const obj = PQ.create()
      const a = new Box(5, 5)
      const b = new Box(2, 3)
      const c = new Box(3, 3)
      const d = new Box(9, 9)
      PQ.queue(obj, a, a.area)
      PQ.queue(obj, b, b.area)
      PQ.queue(obj, c, c.area)
      PQ.queue(obj, d, d.area)

      assert.deepEqual(PQ.peek(obj), d)
      assert.deepEqual(PQ.dequeue(obj), d)
      assert.deepEqual(PQ.dequeue(obj), a)
      assert.deepEqual(PQ.dequeue(obj), c)
      assert.deepEqual(PQ.dequeue(obj), b)
    })

    it('test peek', () => {
      const obj = PQ.create()
      const a = new Box(5, 5)
      const b = new Box(9, 9)
      PQ.queue(obj, a, a.area)
      PQ.queue(obj, b, b.area)

      assert.deepEqual(PQ.peek(obj), b)
    })

    it('throw an error if we try to add a duplicate element in queue', () => {
      const obj = PQ.create()
      const a = new Box(5, 5)
      PQ.queue(obj, a, a.area)
    })

    it('throw an error if we try to delete a key that doesnt exist', () => {
      const obj = PQ.create()
      const a = new Box(15, 5)
      PQ.queue(obj, a, a.area)
      assert.throws(() => { PQ.delete(obj, new Box(15, 51)) }, /^Error/) // delete key that doesnt exist
    })

    it('should delete before updating priority', () => {
      const obj = PQ.create()
      const a = new Box(2, 3)
      const b = new Box(5, 5)
      const c = new Box(3, 3)

      PQ.queue(obj, b, b.area)
      PQ.queue(obj, a, a.area)
      PQ.queue(obj, c, c.area)
      PQ.delete(obj, a) // so we delete 
      
      assert(!PQ.list(obj).includes(a))

      PQ.queue(obj, a, a.area)
      assert.deepEqual(PQ.list(obj)[2], a)
    })

    it('should allow min-heap behavior with negative priority values', () => {
      const obj = PQ.create()

      // if we want to a min-heap (dequeue min value) we can do this by using negative signed priorities
      const negate = (a) => -a

      PQ.queue(obj, 'E', negate(0))
      PQ.queue(obj, 'A', negate(4))
      PQ.queue(obj, 'C', negate(1))
      PQ.queue(obj, 'B', negate(2))
      PQ.queue(obj, 'D', negate(0.34599))

      const output = [ ]
      for (let i=0; i < 5; i++)
          output.push(PQ.dequeue(obj))

      assert.deepEqual(output, [  'E', 'D', 'C', 'B', 'A' ])
    })

    // https://github.com/mreinstein/priority-queue/issues/2
    it('should respect priority (gh issue #2)', () => {
      const obj = PQ.create()

      PQ.queue(obj, 'A', 0.9725668889004737)
      PQ.queue(obj, 'C', 0.8222610668744892)
      PQ.queue(obj, 'J', 0.12049612472765148)
      PQ.queue(obj, 'B', 0.8349967401009053)
      PQ.queue(obj, 'G', 0.3161299272906035)
      PQ.queue(obj, 'F', 0.394229659345001)
      PQ.queue(obj, 'D', 0.7465265986975282)
      PQ.queue(obj, 'E', 0.6853948319330812)
      PQ.queue(obj, 'I', 0.13059667288325727)
      PQ.queue(obj, 'H', 0.14856508816592395)

      const output = [ ]
      for (let i=0; i < 10; i++)
          output.push(PQ.dequeue(obj))

      assert.deepEqual(output, [  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ])
    })

    
  })


})
