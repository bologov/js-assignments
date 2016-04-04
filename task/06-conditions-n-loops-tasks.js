'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
    var result = "";
    if (num % 3 === 0) {
        result += 'Fizz';
    }
    if (num % 5 === 0) {
        result += 'Buzz';
    }
    return result || num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
    if (n == 1) {
        return 1;
    }
    return n * getFactorial(n - 1);
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
    var result = 0;
    for (let i = n1; i <= n2; i++) {
        result += i;
    }
    return result;
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    return a + b > c && a + c > b && b + c > a;
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object 
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 * 
 *  (5;5)
 *     -------------  
 *     |           | 
 *     |           |  height = 10
 *     ------------- 
 *        width=20    
 * 
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 * 
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 * 
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *  
 */
function doRectanglesOverlap(rect1, rect2) {
    return rect1.left < rect2.left + rect2.width 
        && rect1.left + rect1.width > rect2.left 
        && rect1.top < rect2.top + rect2.height
        && rect1.top + rect1.height > rect2.top;

}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
    return Math.hypot(circle.center.x - point.x, circle.center.y - point.y) < circle.radius;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    var char = "";

    for (let i = 0; i < str.length; i++) {
        char = str[i];

        if (str.indexOf(char) === str.lastIndexOf(char))
        {
            return char;
        }
    }

    return null;
}


/**
 * Returns the string representation of math interval, specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    var result = "";

    result += isStartIncluded ? '[' : '(';

    if (a > b) {
        result += b + ', ' + a;
    }
    else {
        result += a + ', ' + b;
    }

    result += isEndIncluded ? ']' : ')';

    return result;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    // var newstr = "";

    // for (let i = str.length - 1; i >= 0; i--) {
    //     newstr += str[i];
    // }

    // return newstr;
    return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    // var length = num.toString().length;
    // var digit = 0;
    // var result = 0;

    // for (let i = 1; i <= length; i++) {
    //     digit = num % 10;    
    //     num = (num - digit) / 10;
    //     result += Math.pow(10, length - i) * digit;
    // }

    // return result;
    return num.toString().split('').reverse().join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
    const biggestDigit = 9; 

    var ccnStr = ccn.toString();
    var length = ccnStr.length;
    var digit = 0;
    var checkSum = 0;


    for (let i = 1; i <= length; i++) {
        digit = Number.parseInt(ccnStr[length - i]);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > biggestDigit) {
                digit -= biggestDigit;
            }
        }   
        checkSum += digit;
    }

    return checkSum % 10 === 0;  
}


/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
    const biggestDigit = 9;

    var length = 0;
    var digit = 0;
    var result = num;

    while (result > biggestDigit) {
        num = result;
        length = result.toString().length;
        result = 0;

        for (let i = 1; i <= length; i++) {
            digit = num % 10;    
            num = (num - digit) / 10;
            result += digit;
        }
    }
    
    return result;
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true 
 */
function isBracketsBalanced(str) {
    const maxDistanceInUnicode = 2;

    var bracketsArr = [];
    var bracket = "";

    for (let i = 0; i < str.length; i++) {
        bracket = str[i];

        if (bracket === "[" || bracket === "(" || bracket === "{" || bracket === "<") {
            bracketsArr.push(bracket);
        }
        else {
            if (bracketsArr.length === 0) {
                return false;
            }
            else if (Math.abs(bracketsArr.pop().charCodeAt() - bracket.charCodeAt()) > maxDistanceInUnicode) {
                return false;
            }
        }
    }
    return bracketsArr.length === 0;
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    const milliInSec = 1000;
    const secInMin = 60;
    const minInHour = 60;
    const hourInDay = 24;
    const dayInMonth = 30;
    const dayInYear = 365;
    const smallestAmount = 2;

    var time = endDate.getTime() - startDate.getTime();
    var timeUnit = "";
    var roundTime = 0;
    var number;

    while (time != 0) {

        //Get seconds
        time /= milliInSec;

        if (time > 0 && time <= 45) {    
            number = "a few";
            timeUnit = "seconds";
            break;
        }
        if (time > 45 && time <= 90) {
            number = "a";
            timeUnit = "minute";
            break;
        }

        //Get minutes
        time /= secInMin;

        if (Math.round(time) >= 2 &&  time <= 45) {          
            number = smallestAmount;
            roundTime = Math.floor(time);
            if (number < roundTime) {
                number = roundTime;
            }
            timeUnit = "minutes";
            break;
        }
        if (time > 45 &&  time <= 90) {
            number = "an";
            timeUnit = "hour";
            break;
        }

        //Get hours
        time /= minInHour;

        if (Math.round(time) >= 2 &&  time <= 22) {
            number = smallestAmount;
            roundTime = Math.floor(time);
            if (number < roundTime) {
                if (time % 1 > 0.5) {
                    number = Math.round(time);
                }
                else {
                    number = roundTime;
                }
            }
            timeUnit = "hours";
            break;
        }
        if (time > 22 &&  time <= 36) {
            number = "a";
            timeUnit = "day";
            break;
        }

        //Get days
        time /= hourInDay; 

        if (time <= 25) {
            number = smallestAmount;
            roundTime = Math.floor(time);
            if (number < roundTime) {
                if (time % 1 > 0.5) {
                    number = Math.round(time);
                }
                else {
                    number = roundTime;
                }
            }
            timeUnit = "days";
            break;
        }
        else if (time <= 45) {
            number = "a"
            timeUnit = "month";
            break;
        }
        else if (time <= 345) {
            number = smallestAmount;
            roundTime = Math.round(time / dayInMonth);      
            if (number < roundTime) {
                number = roundTime;
            }
            timeUnit = "months";
            break;
        }
        else if (time <= 545) {
            number = "a"
            timeUnit = "year";
            break;
        }
        else {
            number = smallestAmount;
            roundTime = Math.round(time / dayInYear);
            if (number < roundTime) {
                number = roundTime;
            }
            timeUnit = "years";
            break;
        }
    }
    return `${number} ${timeUnit} ago`;
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
    // var str = "";
    // var remainder = 0;

    // while (num >= n)
    // {
    //     remainder = num % n;
    //     str = remainder + str;
    //     num = (num - remainder) / n; 
    // }

    // return num + str;
    return num.toString(n);
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
    var commonPath = "";
    var strNum = pathes.length;
    var char = "";

    var minLength = pathes.reduce((prev, cur) => {
        return prev.length < cur.length ? prev.length : cur.length;
    }, pathes[0].length);

    for (let i = 0; i < minLength; i++) {
        char = pathes[0][i];
        for (let cur = 1; cur < strNum; cur++) {
            if (char !== pathes[cur][i]) {
                return commonPath.slice(0, commonPath.lastIndexOf('/') + 1);
            }
        }
        commonPath += char;
    }
    return commonPath.slice(0, commonPath.lastIndexOf('/') + 1);
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
    var rows = m1.length;
    var columns = m2[0].length;
    var givenSecondDim = m2.length;

    var product = new Array(rows).fill(0).map(() => {
        return new Array(columns).fill(0);
    });

    return product.map((row, i) => {
        return row.map((elem, j) => {
            for (let k = 0; k < givenSecondDim; k++) {
                elem += m1[i][k] * m2[k][j];
            }
            return elem;
        });
    });
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
    const areaSize = 3;
    var char = "";
    var isWinner = true;

    //Row check
    for (let i = 0; i < areaSize; i++) {
        isWinner = true;
        char = position[i][0];
        for (let j = 1; j < areaSize; j++) {
            if (char !== position[i][j] || char === undefined) {
                isWinner = false;
                break;
            }
        }
        if (isWinner) {
            return char;
        }
    }

    //Column check
    for (let j = 0; j < areaSize; j++) {
        isWinner = true;
        char = position[0][j];
        for (let i = 1; i < areaSize; i++) {
            if (char !== position[i][j] || char === undefined) {
                isWinner = false;
                break;
            }
        }
        if (isWinner) {
            return char;
        }
    }

    //Diagonal check
    char = position[0][0];
    isWinner = true;
    for (let i = 1; i < areaSize; i++) {
        if (char !== position[i][i] || char === undefined) {
            isWinner = false;
            break;
        }
    }
    if (isWinner) {
        return char;
    }
    

    //Antidiagonal check
    char = position[0][areaSize - 1];
    isWinner = true;
    for (let i = 1; i < areaSize; i++) {
        if (char !== position[i][areaSize - 1 - i] || char === undefined) {
            isWinner = false;
            break;
        }
    }
    if (isWinner) {
        return char;
    }
    return undefined;
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
