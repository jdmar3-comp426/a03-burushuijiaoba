import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js";
/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {
    avgMpg: {
        city : mpg_data.reduce(function(pre,cur){
            return pre + cur.city_mpg;
        },0)/mpg_data.length,
        highway : mpg_data.reduce(function(pre,cur){
            return pre + cur.highway_mpg;
        },0)/mpg_data.length},
    allYearStats: getStatistics(mpg_data.map(item => item.year)),
    ratioHybrids: getSum(mpg_data.map(item => {if(item.hybrid){return 1;} return 0;}))/mpg_data.length
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */




export const moreStats = {
    makerHybrids: mpg_data.filter(car => car.hybrid).reduce(function(pre,cur){
        if(pre.indexOf(cur) == -1){
            let new_record = {make:cur.make, hybrid:[cur.id]};
            pre.push(new_record);
        }
        else{
            if(pre[cur.make]["hybrid"].indexOf(cur.id) == -1){
                pre[cur.make]["hybrid"].push(cur.id);
            }
        }
        return pre;
    },[]).sort((a,b) => a.hybrid.length - b.hybrid.length),

    avgMpgByYearAndHybrid: mpg_data.reduce(function(pre,cur,indx){
        if(!(cur.year in pre)){
            if(cur.hybrid){
                pre[cur.year]={hybrid:{city:[cur.city_mpg], highway:[cur.highway_mpg]},notHybrid:{city:[],highway:[]}};
            }
            else{
                pre[cur.year]={hybrid:{city:[], highway:[]},notHybrid:{city:[cur.city_mpg],highway:[cur.highway_mpg]}};
            }
        }
        else{
            if(cur.hybrid){
                pre[cur.year].hybrid.city.push(cur.city_mpg);
                pre[cur.year].hybrid.highway.push(cur.highway_mpg);
            }
            else{
                pre[cur.year].notHybrid.city.push(cur.city_mpg);
                pre[cur.year].notHybrid.highway.push(cur.highway_mpg);
            }
        }
        if(indx == mpg_data.length-1){
            for(const [key, value] of Object.entries(pre)){
                value.hybrid.city = getSum(value.hybrid.city)/value.hybrid.city.length;
                value.hybrid.highway = getSum(value.hybrid.highway)/value.hybrid.highway.length;
                value.notHybrid.city = getSum(value.notHybrid.city)/value.notHybrid.city.length;
                value.notHybrid.highway = getSum(value.notHybrid.highway)/value.notHybrid.highway.length;
            }
        }
        return pre;
    },{})
};
