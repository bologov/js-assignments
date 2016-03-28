'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" possiblePathes inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    /* The idea of this solution is to create an array of 
     * possible move coordinates for every character in
     * search string.
     *
     * Possible moves stored in array, which contain another arrays 
     * for every character of search string. These arrays keeps
     * possible moves as array of two coordinates.
     *
     * When current path can not be continued, we search for 
     * nearest possible different move in array.
     * 
     * Once used, possible move gets deleted from array of
     * possible moves.
     */
    const puzzleWidth = puzzle[0].length;
    const puzzleHeight = puzzle.length;

    var possiblePathes = new Array(searchStr.length).fill(0).map(() => {
        return new Array();
    });

    var pos = 0;
    var path = [];
    var cur = [];
    var isPath = false;
    var i;
    var j;

    /* Searching for all occurrences of searchStr first letter in puzzle */
    for (let j = 0; j < puzzleHeight; j++) {
        for (let i = 0; i < puzzleWidth; i++) {
            if (puzzle[j][i] === searchStr[pos]) {
                possiblePathes[0].push([j, i]);
            }
        }
    }

    /* While position within the given boundaries */
    while (pos < searchStr.length && pos >= 0) {

        /* If current position equals to 0, we just take one position from list */
        if (pos === 0) {
            if (possiblePathes[0].length === 0) {
                return false;
            }
            else {
                cur = possiblePathes[0].shift();
                path = [];
                path.push(cur);
            }
        }

        isPath = false;
        j = cur[0];
        i = cur[1];
        /* Now we going to check bottom, top, left and right directions of current position
         * The block before && checks if such direction exists
         * Next block checks if this position contains required element(next character in search string)
         */
        if (j + 1 < puzzleHeight && puzzle[j + 1][i] === searchStr[pos + 1]) {
            /*Does this position is already used in snake */
            if (path.indexOf([j + 1, i] === -1))
            {
                possiblePathes[pos + 1].push([j + 1, i]);
                isPath = true;
            }
        }
        if (j - 1 > 0 && puzzle[j - 1][i] === searchStr[pos + 1]) {
            if (path.indexOf([j - 1, i]) === -1)
            {
                possiblePathes[pos + 1].push([j - 1, i]);
                isPath = true;
            }
        }
        if (i + 1 < puzzleWidth && puzzle[j][i + 1] === searchStr[pos + 1]) {
            if (path.indexOf([j, i + 1]) === -1)
            {
                possiblePathes[pos + 1].push([j, i + 1]);
                isPath = true;
            }
        }
        if (i - 1 > 0 && puzzle[j][i - 1] === searchStr[pos + 1]) {
            if (path.indexOf([j, i - 1]) === -1)
            {
                possiblePathes[pos + 1].push([j, i - 1]);
                isPath = true;
            }
        }
        /* If there were no possible directions */
        if (!isPath) {
            /* Now we going through snake backwards and trying to find
             * position with unused alternative routes
             */
            while (possiblePathes[pos].length === 0 && pos > 0 ){
               pos--;
               path.pop();
            }
            /*If there are no another crossway, return false */
            if (pos < 0) {
                return false;
            }
            /* The cituation, when position equals to zero is handled by 
             * code at the beginning of while cycle
             */
            else if (pos !== 0){
                cur = possiblePathes[pos].shift();
                path.push(cur);
            }
        }
        /* If there were possible directions - then move on one of them */
        else {
            pos++;
            cur = possiblePathes[pos].shift();
            path.push(cur);
        }
        /* If current position in search string is at the last character
         * of it that means, that string was found in puzzle
         */
        if (pos === searchStr.length - 1) {
            return true;
        }
    }
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */

 //Every time adding new char at every position of all strings
function* getPermutations(chars) {
    /* The idea of this solution is to take given string
     * character by character and do the following:
     * take every character and create new strings by 
     * putting this character at all possible positions
     * of every string created earlier.
     *
     * Example:
     * given : abc
     * 1st step: a
     * 2nd step: ba, ab
     * 3rd ster: ba -> cba, bca, bac
     *           ab -> cab, acb, abc
     */
    var arr = [];
    var newArr = [];
    var pos = 0;
    /* Every char */
    for(let i = 0; i < chars.length; i++) {
        if (!arr.length) {
            arr.push(chars[i]);
            continue;
        }
        else {
            newArr = [];
            /* For every already existing string */
            for (let j = 0; j < arr.length; j++) {
                /* For every position in these strings */
                for (let k = 0; k <= arr[0].length; k++) {
                    if (k === 0) {
                        newArr.push(chars[i] + arr[j]);
                        continue;
                    }
                    if (k === arr[0].length) {
                        newArr.push(arr[j] + chars[i]);
                        continue;
                    }
                    newArr.push(arr[j].slice(0, k) + chars[i] + arr[j].slice(k));
                }
            }
            /* Replacing old array with new one */
            arr = newArr;
        }
    }
    while (pos < arr.length) {
        yield arr[pos++];
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    /* The idea of this solution is to find max price
     * and buy everything until it and sell it with
     * max price. After that, we'll find max price in
     * the remaining string and so on...
     *
     * If max price in the remaining string is on it's
     * first position - we won't buy anything and will 
     * wait for another possibility.
     */
    var max = Math.max.apply(null, quotes);
    var items = 0;
    var outcome = 0;
    var profit = 0;

    /* If it is not the max price yet - then buy everything */
    for (let current = 0; current < quotes.length; current++){
        if (quotes[current] !== max) {
            outcome += quotes[current];
            items++;
        }
        /* If it is the max price - then sell everything */
        if (quotes[current] === max) {
            if (items !== 0)
            {
                profit += quotes[current] * items - outcome;
                outcome = 0;
                items = 0;
            }
            /* Find next max value in stock quotes */
            max = Math.max.apply(null, quotes.slice(current + 1));
        }
    }

    return profit;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        throw new Error('Not implemented');
    },
    
    decode: function(code) {
        throw new Error('Not implemented');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
