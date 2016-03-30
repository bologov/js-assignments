'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    /* The idea of this solution is to use found given 
     * the law of distribution compass points names
     * and azimuth.
     */
    const azimuthPerPoint   = 11.25;
    const pointsPerCardinal = 8;
    const cardinalsNum      = 4;


    var azimuth = 0;
    var compass = [];
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    var cur, next, half;
    var abbr = '';
    var first, second;

    for (let cardinal = 0; cardinal < cardinalsNum; cardinal++) {
        cur = sides[cardinal];

        /* Next side for W is N */
        next    = cardinal !== cardinalsNum - 1     ? sides[cardinal + 1]   : sides[0];

        /* If half side contains either 'S' or 'N' - it will be at the first position*/
        half  = next === 'S' || next === 'N'        ? next + cur            : cur + next;
        
        /* Law of distribution of left part of abbreviation for every point */
        first = [cur, cur, cur, half, half, half, next, next];

        /* Half of law of distribution of right part of abbreviation for every point */
        second = ['', next, half, cur];

        /* It made from two same parts*/
        second = second.concat(second);

        for (let point = 0; point < pointsPerCardinal; point++) { 

            /* Every second point contains 'b' in the middle of abbreviation*/
            abbr = first[point] + (  point % 2 === 1     ? 'b'   : '' ) + second[point];

            /* Azimuth equals to multiplication of absolute point number with degrees per point*/
            azimuth = (point + cardinal * pointsPerCardinal) * azimuthPerPoint;

            compass.push({abbreviation: abbr, azimuth: azimuth});
        }

    }
    return compass;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    /* The idea of this solution is to search for the
     * first pair of brackets(both open and close) in given string.
     *
     * One string from start of list with found pair in it will 
     * be replaced with a certain number of strings which equals
     * to number of items containing in the found pair of brackets. 
     * It's items will replace brackets in copies of given string and
     * those strings will pushed to the end of list.
     */
    var variants    = [];
    var stack       = [];
    var items       = [];
    var pos         = 0;
    var begin       = 0;
    var end         = 0;
    var isBraces    = false;
    var newstr      = '';

    /* Pushing given string in variants array */
    variants.push(str);

    while (true) {
        isBraces = false;

        /* For first string in result array */
        for (let i = 0; i < variants[0].length; i++) {

            /* Opening bracket found */
            if (variants[0][i] === '{') {
                isBraces = true;
                stack.push(i);
            }

            /* Closing bracket found */
            if (variants[0][i] === '}') {
                begin = stack.pop();
                end = i;

                /* Items inside of pair of brackets are separated with commas*/
                items = variants[0].slice(begin + 1, end).split(',');

                /* For every item in found pair*/
                for (let variant = 0; variant < items.length; variant++) {

                    /* Replacing pair of brackets with one of items containing in it*/
                    newstr = variants[0].slice(0, begin) + items[variant] + variants[0].slice(end + 1);

                    /* Check to avoide duplication when nested pairs are present */
                     if (variants.indexOf(newstr) === -1) {

                        /* New strings pushed to the end of array*/
                        variants.push(newstr);
                    }     
                }

                /* String with found pair of brackets gets removed from the start */
                variants.shift();
                stack = [];
                break;
            }
        }
        if (!isBraces) {
            break;
        }
    }

    while (pos < variants.length) {
        yield variants[pos++];
    }
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    /* The idea of this solution is all about checks
     * and certain position changes at each step which
     * depends on current direction of bypass.
     * 
     * At the very first step direction is considered
     * to be right(->);
     */
    var posX        = 0;
    var posY        = 0;
    var filler      = 0;
    var goingLeft   = false;
    var xChange  = 0;
    var yChange  = 0;

    var matrix = new Array(n).fill(0).map(() => {
        return new Array(n).fill(0);
    });

    /* Check for being in borders of matrix*/
    while (posX < n && posY < n) {

        /* Changing current element of matrix and filler's value */
        matrix[posY][posX] = filler++;

        /* If going to right and reached the top line but not the right line*/
        if (posY === 0 && posX !== n - 1 && goingLeft === false) {
            goingLeft = true;
            posX += 1;
            xChange = -1;
            yChange = 1;
            continue;
        }
        /* If going to right and reached the right line but not the top line*/
        if (posX === n - 1 && goingLeft === false) {
            goingLeft = true;
            posY += 1;
            xChange = -1;
            yChange = 1;
            continue;
        }
        /* If going to left and reached the bottom line*/
        if (posY === n - 1 && goingLeft === true) {
            goingLeft = false;
            posX += 1;
            xChange = 1;
            yChange = -1;
            continue;
        }
        /* If going to left and reached the left line*/
        if (posX === 0 && goingLeft === true) {
            goingLeft = false;
            posY += 1;
            xChange = 1;
            yChange = -1;
            continue;
        }
        /* If no borders were reached*/
        else {
            posX += xChange;
            posY += yChange;
        }
        
    }
    return matrix;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    /* The idea of this solution is to flat given dominoes
     * into the string, and count how much times each 
     * possible number appears. Each number should appear
     * even number of times to make the row of dominoes possible.
     *
     * Two numbers from given string (but not from the
     * same dominoe) should be considered as start and end 
     * of the row and they do not participate in numbers counting.
     *
     * We should check all variants with various numbers excluded.
     *
     * The problem is dominoes with same numbers on both side. If such
     * dominoe is used the count of it's number in given string 
     * must be both even and larger than 2, except the case, when it's
     * used for either start or end.
     */
    const dominoeDigitsNum = 7;
    var digits = new Array(dominoeDigitsNum).fill(0);
    var isSame = new Array(dominoeDigitsNum).fill(0);

    var dominoesGiven   = dominoes.length;
    var dominoesStr     = '';
    var isFound         = false;
    var i, j;
    
    /* Making dominoes string */
    for (let x = 0; x < dominoesGiven; x++) {
        dominoesStr += dominoes[x].join('');
    }

    /* Check for existence of bones with same numbers on both it's sides */
    for (let x = 0; x < dominoesGiven; x++) {
        if (dominoes[x][0] === dominoes[x][1]) {
            isSame[dominoes[x][0]] = [x * 2, x * 2 + 1];
        }
    }

    /* Excluding every possible pair of numbers from string */
    for (i = 0; i < dominoesStr.length; i++) {
        for (j = i + 1; j < dominoesStr.length; j++) {

            /* Skip if this pair of numbers is situated on the same dominoe */
            if (i % 2 === 0 && j - i === 1) {
                continue;
            }

            digits.fill(0);
            isFound = true;

            /* Counting appears of each number in string excluding choosed pair */
            for (let x = 0; x < dominoesStr.length; x++) {
                if (x === i || x === j) {
                    continue;
                }
                digits[dominoesStr[x]]++;
            }

            /* Checking if row of dominoes is possible*/
            for (let x = 0; x < dominoeDigitsNum; x++) {

                /* If number of appears is odd */
                if (digits[x] % 2 !== 0) {
                    isFound = false;
                    break;
                }

                /* If there are dominoe with same numbers on it's sides but 
                 * this number appears only twice 
                 */
                else if (isSame[x] && digits[x] === 2) {

                    /* It can be only if this dominoe got excluded number */
                    if (isSame[x][0] === i || isSame[x][0] === j || isSame[x][1] === i || isSame[x][1] === j) {
                        continue;
                    }
                    isFound = false;
                    break;
                }
            }
            if (isFound) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    /* The idea of this solution is to try to push every
     * number taken from array into sequence. When this
     * element follows after the last element of sequence,
     * we'll just push him into. If it does not, we'll check
     * length of current sequence. If it bigger than two, we'll
     * add sequence values to result as an sequence, 
     * in other case, we'll add sequence values to result as
     * an separate values. After that, element from array
     * will be pushed to the empty sequence.
     */
    var result = "";
    var currentSequence = [];
    var position = 0;

    while(position < nums.length) {

        /* If sequence array is empty or given number follows after last number in sequence - 
         * then just push current number in it.
         */
        if (!currentSequence.length || nums[position] - currentSequence[currentSequence.length - 1] === 1) {
            currentSequence.push(nums[position]);
        }
        else {

            /* If current number doesn't follow after last  number in sequence -
             * then we need to transform sequence into string and concat it to result
             */
            if (currentSequence.length <= 2) {
                addSequenceToResultAndEmptyIt(currentSequence);
            }   
            else {
                addSequenceToResultAndEmptyIt(currentSequence.shift() + '-' + currentSequence.pop());
            }
            
            /* Pushing current number in the empty sequence */
            currentSequence.push(nums[position]);              
        }
        position++;
    }

    /* If sequence isn't empty, we need to concat it's content to result */
    if (currentSequence.length && currentSequence.length <= 2) {
        addSequenceToResultAndEmptyIt(currentSequence);
    }
    else if (currentSequence.length > 2) {
        addSequenceToResultAndEmptyIt(currentSequence.shift() + '-' + currentSequence.pop());
    }
    return result;

    function addSequenceToResultAndEmptyIt(arg) {
        if (result !== '') {
            result += ',';
        }
        result += arg;
        currentSequence = [];
    }
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
