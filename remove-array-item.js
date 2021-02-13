/**
 * Remove 1 item from an array
 *
 * @function removeItems
 * @param {Array<*>} arr The target array
 * @param {number} arrLength actual length of the array
 * @param {number} removeIdx The index to remove from (inclusive)
 */
export default function removeItem (arr, arrLength, removeIdx) {
    const len = arrLength - 1
    for (let i = removeIdx; i < len; ++i)
        arr[i] = arr[i + 1]
}