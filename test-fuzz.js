import PQ from './priority-queue.js'


function randomInt (min, max) {
    return min + Math.round((max - min) * Math.random())
}


const TEST_COUNT = 20000 

console.log(`Fuzzing ${TEST_COUNT} iterations`)

for (let i=0; i < TEST_COUNT; i++) {

    const itemCount = randomInt(1, 1000)

    const queue = PQ.create(itemCount)

    // add itemCount items with random values
    for (let i = 0; i < itemCount; i++) {
        const val = Math.random()
        const priority = val
        PQ.queue(queue, val, priority)
    }

    // remove the items in order
    let output = [ ]
    for (let i = 0; i < itemCount; i++)
        output.push(PQ.dequeue(queue))

    for (let i = 0; i < itemCount; i++)
        if (i > 0 && output[i] > output[i-1])
            throw new Error(`priority not respected in this run; ${output[i]} > ${output[i-1]}`)
}

console.log('Fuzzing completed without errors')
