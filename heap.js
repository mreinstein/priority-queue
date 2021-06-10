import removeItem from './remove-array-item.js'


// creates a new heap data structure
function create (comparator, maxLength=1000) {
	if (!Number.isInteger(maxLength))
    	throw new Error('maxLength must be an integer')

	const arr = new Array(maxLength)
	return { arr, length: 0, maxLength, comparator }
}


function insert (heap, item) {
	if (heap.length === heap.maxLength)
		return

	heap.arr[heap.length] = item
	heap.length++
	callHeapify(heap)
}


function callHeapify (heap) {
	let ind = heap.length - 1
    while (ind > 0) {
		if (ind % 2 === 0)
			ind = (ind - 2) / 2
		else
			ind = (ind - 1) / 2

		heapify(heap, ind)
    }
}


function heapify (heap, parentInd) {
	let largestInd = parentInd
	const leftChildInd = 2 * parentInd + 1
	const rightChildInd = 2 * parentInd + 2

	// if child exists and is greater than parent
	if (heap.length > leftChildInd && heap.comparator(getValue(heap.arr[parentInd]), getValue(heap.arr[leftChildInd])))
		largestInd = leftChildInd

	if (heap.length > rightChildInd && heap.comparator(getValue(heap.arr[largestInd]), getValue(heap.arr[rightChildInd])))
		largestInd = rightChildInd

	if (largestInd != parentInd) {
		swap(heap, largestInd, parentInd)
		heapify(heap, largestInd)
	}
}


function poll (heap, dequeueHighest=true) {
	if (heap.length === 0)
		return

	const max = dequeueHighest ? heap.arr[0] : heap.arr[heap.length-1]

	if (dequeueHighest)
		removeItem(heap.arr, heap.length, 0)

    heap.length--
    callHeapify(heap)
    return max.priority ? max : max.val
}


function peek (heap, dequeueHighest=true) {
	if (heap.length === 0)
      return

    const firstIndex = dequeueHighest ? 0 : heap.length-1
    return heap.arr[firstIndex].priority ? heap.arr[firstIndex] : heap.arr[firstIndex].val
}


function getValue (obj) {
    return obj.priority ? obj.priority : obj.val // if priority is undefined then return val
}


function swap (heap, i, j) {
	[heap.arr[i], heap.arr[j]] = [heap.arr[j], heap.arr[i]];
}


export default { create, callHeapify, insert, poll, peek }
