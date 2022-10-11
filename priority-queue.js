
function create (maxLength=1000) {
	return {
		arr: new Array(maxLength),
		length: 0,
		maxLength,
	}
}


function queue (heap, item, priority) {
	if (priority === undefined)
		throw new Error('must include priority when queueing')

	if (_findIndex(heap, item) >= 0) {
    	del(heap, item)
	}

	if (heap.length === heap.maxLength) {
		return
	}

	heap.arr[heap.length] = { item, priority }
	heap.length++

	_upHeap(heap, heap.length-1)
}


// traverse up the heap from a starting index
//
// heap
// index to start at
function _upHeap (heap, index) {
	
	while (index > 0) {

		let parentIdx

		if (index % 2 === 0)
			parentIdx = (index - 2) / 2
		else
			parentIdx = (index - 1) / 2

		// if the parent is greater than the current node, stop because we've corrected the heap
		if (heap.arr[parentIdx].priority >= heap.arr[index].priority)
			return

		_swap(heap.arr, index, parentIdx)

		index = parentIdx
	}
}


// get and remove highest priority item from the heap
function dequeue (heap) {
	if (heap.length === 0)
		return

	const max = heap.arr[0].item

	heap.length--
	heap.arr[0] = heap.arr[heap.length]

	_downHeap(heap, 0)

	return max
}


// traverse down the heap from a starting index
//
// heap
// index to start at
function _downHeap (heap, index) {
	while (index < heap.length) {
		
		const left = index * 2 + 1
		const right = index * 2 + 2

		let largest = index

		if (left <= heap.length && heap.arr[left].priority > heap.arr[largest].priority)
	        largest = left

	    if (right <= heap.length && heap.arr[right].priority > heap.arr[largest].priority)
	        largest = right
	    
	    if (largest === index)
	    	return

	    _swap(heap.arr, index, largest)

    	index = largest
    }
}


function _swap (arr, i, j) {
	const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}


function clear (heap) {
	heap.length = 0
}


function isEmpty (heap) {
	return heap.length === 0
}


function peek (heap) {
	if (!heap.length)
		return
	return heap.arr[0].item
}


function del (heap, item) {
	const ind = _findIndex(heap, item)

	if (ind < 0)
		throw new Error('key does not exist in priority queue!')

	const tmp = heap.arr[ind]
	heap.arr[ind] = heap.arr[heap.length-1]
	heap.arr[heap.length-1] = tmp

	if (heap.arr[ind].priority > heap.arr[heap.length-1].priority)
		_upHeap(heap, ind)
	else if (heap.arr[ind].priority < heap.arr[heap.length-1].priority)
		_downHeap(heap, ind)

	heap.length--
}


function _findIndex (heap, item) {
	for (let i=0; i < heap.length; i++)
		if (heap.arr[i].item === item)
			return i
	return -1
}


function list (heap) {
	if (!heap.length)
		return [ ]

	const result = [ ]
	for (let i=0; i < heap.length; i++)
		result[i] = heap.arr[i].item

	return result
}


export default { create, queue, dequeue, clear, isEmpty, peek, delete: del, list }
