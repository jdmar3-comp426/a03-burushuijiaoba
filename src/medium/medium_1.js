import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var total = 0;
    for(var i =0;i<array.length;i++){
        total += array[i];
    }
    return total;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    var size = array.length;
    array.sort(function(a,b){
        return a-b;
    });
    if (size%2){
        return array[(size-1)/2];
    };
    return (array[size/2] + array[(size/2)-1])/2.0;

}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let res = new Object();
    array.sort(function(a,b){
        return a-b;
    });
    const mean = getSum(array)/array.length;
    // var variance = 0;
    // array.forEach(function(value){
    //     variance += (value-mean)**2/array.length;
    // });
    res[`length`] = array.length;
    res[`sum`] = getSum(array);
    res[`mean`] = mean;
    res[`median`] = getMedian(array);
    res[`min`] = array[0];
    res[`max`] = array[array.length-1];
    res[`variance`] = variance(array,mean);
    res[`standard_deviation`] = Math.sqrt(variance(array,mean));
    return res;
}

