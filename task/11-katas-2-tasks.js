'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    /* The idea of this solution is to make a base,
     * containing each digit written with pipes and
     * underscores.
     *
     * After that, we will extract digits in this form
     * from given bank account and find this representation
     * in already existing "database".
     */
    const digitsNumber = 10;
    const stringsNum = 3;
    const charPerDigit = 3;

    var representation =    ' _     _  _     _  _  _  _  _ \n'+
                            '| |  | _| _||_||_ |_   ||_||_|\n'+
                            '|_|  ||_  _|  | _||_|  ||_| _|\n';

    /* Transform strings into arrays */
    representation = representation.split('\n');
    bankAccount = bankAccount.split('\n');
    
    var accLength = bankAccount[0].length;
    var result = '';
    var str = '';

    var digits = [];

    /* Making base of digits, where position equals to digit value */
    for (let basePos = 0; basePos < digitsNumber; basePos++) {
        str = '';
        for (let n = 0; n < stringsNum; n++) {
            str += representation[n].substring(charPerDigit * basePos, charPerDigit * basePos + 3);
        }
        digits.push(str);
    }

    /* Extracting numbers from bank account and searching for it
     * in the digits(which contain digits representations) array 
     */
    for (let accPos = 0; accPos < (accLength - 2) / charPerDigit; accPos++) {
        str = '';
        for (let n = 0; n < stringsNum; n++) {
            str += bankAccount[n].substring(charPerDigit * accPos, charPerDigit * accPos + 3);
        }
        result += digits.indexOf(str);
    }

    return result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    /* The idea of this solution is to take symbols
     * out of this text word by word and add it to 
     * existing string only if the result string length
     * won't be larger than given. In this case existing
     * string will be yilded, and word will be added to
     * empty string.
     */
    var outputString = '';
    var word = '';

    while (text) {
        /* Taking word out of the text and checking existence of other words */
        if (text.indexOf(' ') !== -1) {
            word = text.slice(0, text.indexOf(' '));
            text = text.slice(word.length + 1);
        }
        else {
            word = text;
            text = '';
        }
        
        /* Checking length of new string */
        if ((outputString + ' ' + word).length <= columns) {
            /* Adding space if it is necessary */
            if (outputString.length !== 0) {
                outputString += ' ';
            }
            outputString += word;
        }
        else {
            /* Passing string away if it length is bigger, than given */
            yield outputString;
            outputString = word;
        }
    }
    if (outputString.length !== 0) {
        yield outputString;
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    /* The idea of this solution is to check all
     * possible poker hand ranks.
     *
     * It's should be considered, that ace in 
     * straight combinations can have both highest
     * and lowest rank.
     */
    const cardCount = 5;
    const cards = "A234567891JQK"; //Ace has lowest rank
    const cardsAceHighest = "234567891JQKA"; //Ace has highest rank
    const suits = "♣♦♥♠";
    
    var sameArr = [];
    var usedCards = [];
    var sameCount = 0;

    var isAceThere;
    var isStraight = false;
    var isSame = false;
    
    /* Ace presence check */
    isAceThere = hand.reduce((prev, cur) => {
        if (prev || cur[0] === 'A') {
            return true;
        }
        return false;
    }, false);
    
    /* If ace is present in hand, presence of the
     * straight combination should be checked with
     * both highest and lowest rank
     */
    if (isAceThere) {
        /* Sorting hand with highest ace rank */
        hand.sort((a, b) => {
            return cardsAceHighest.indexOf(a[0]) - cardsAceHighest.indexOf(b[0]);
        })

        isStraight = hand.reduce((prev, cur) => {
            if (prev === false) {
                return false;
            }
            if (cardsAceHighest.indexOf(prev[0]) + 1 === cardsAceHighest.indexOf(cur[0])) {
                return cur;
            }
            return false;
        }) !== false;
    }

    /* If there were no straight hand rank, we should
     * check it's presence with ace considered as card 
     * with lowest rank. In other case, straight hand 
     * rank blocks presence of all other ranks
     */
    if (!isStraight) {
        /* Sorting hand with lowest ace rank */
        hand.sort((a, b) => {
            return cards.indexOf(a[0]) - cards.indexOf(b[0]);
        })
        
        isStraight = hand.reduce((prev, cur) => {
            if (prev === false) {
                return false;
            }
            if (cards.indexOf(prev[0]) + 1 === cards.indexOf(cur[0])) {
                return cur;
            }
            return false;
        }) !== false;    
    }

    /* Checking for having rank with same suit cards */
    isSame = hand.reduce((prev, cur) => {
        if (prev.indexOf(cur[cur.length - 1]) === -1) {
            return prev + cur[cur.length - 1];
        }
        return prev;
    }, '').length === 1;
    
    /* Straight hand rank blocks presence of all other ranks */
    if (isStraight) {
        if (isSame) {
            return PokerRank.StraightFlush;
        }
        else {
            return PokerRank.Straight;          
        }
    }
    
    /* In other case, we should calculate cards repeats in hand
     * despite of it's suit 
     */
    for (let current = 0; current < cardCount; current++) {
        sameCount = 1;
        /* If card wasn't counted earlier */
        if (usedCards.indexOf(hand[current][0]) === -1) {
            usedCards.push(hand[current][0]);
            for (let i = current + 1; i < cardCount; i++) {
                if (hand[i][0] === hand[current][0]){
                    sameCount++;
                }
            }
        }
        /*If card occurs more than once*/
        if (sameCount > 1) {
            /* If it occurs twice - then we will put it in the start of array*/
            if (sameCount === 2) {
                sameArr.unshift(sameCount);
            }
            /* If it occurs more than twice - in the end */
            else {
                sameArr.push(sameCount);
            }
        }
    }
    
    /* Checking all poker hand ranks in decreasing order,
     * except straight ranks, which was checked earlier *
     */
    if (sameArr.length === 1 && sameArr[0] === 4) {
        return PokerRank.FourOfKind;
    }  
    else if (sameArr.length === 2 && sameArr[0] === 2 && sameArr[1] === 3) {
        return PokerRank.FullHouse;
    }
    else if (isSame) {
        return PokerRank.Flush;
    }
    else if (sameArr.length === 1 && sameArr[0] === 3) {
        return PokerRank.ThreeOfKind;
    }
    else if (sameArr.length === 2 && sameArr[0] === 2 && sameArr[1] === 2) {
        return PokerRank.TwoPairs;
    }
    else if (sameArr.length === 1 && sameArr[0] === 2) {
        return PokerRank.OnePair;
    }
    
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    /* The idea of this solution is to find all
     * pluses, representing corners of rectangles.
     *
     * Then each plus will be checked for neighbour
     * pluses in the same row, and pair will be created
     * between current plus and first of found. This
     * pair should have no spaces(' ') between them.
     * 
     * Each pair will be checked for columns(|) of 
     * arbitrary length under both pluses. Each column
     * should end with another plus. In this case we
     * will have a rectangular found;
     */
    var arr = figure.split('\n');
    var plusArr = [];
    var rectangles = [];
    var nextPlus = 0;
    var width = 0;
    var height = 0;
    var i, j, i2;

    /* Finding pluses */
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr[0].length; i++) {
            if (arr[j][i] === '+') {
                plusArr.push([j, i]);
            }
        }
    }

    /* For every found plus */
    for (let current = 0; current < plusArr.length; current++) {
        /* Checking existing of the next plus in list */
        if (current + 1 >= plusArr.length) {
            break;
        }
        nextPlus = current + 1;
        /* While next plus is at the same row */
        while (plusArr[nextPlus][0] === plusArr[current][0]) {

            j = plusArr[current][0];
            i = plusArr[current][1];
            i2 = plusArr[nextPlus][1];
            
            /* Width of possible rectangle and it's start height */
            width = arr[j].slice(i + 1, i2).length;
            height = 1;

            /* Check for empty space in top line of rectangle */
            if (arr[j].slice(i + 1, i2).indexOf(' ') !== -1) {
                break;
            }

            /* Going down while there are '|' symbol on both sides of rectangle */
            while (arr[j + height][i]  === '|' && arr[j + height][i2] === '|') {
                height++;
            }
            /* If we've met plus on both side of possible rectangle - it means
             * we've found one, and we should set current position to next plus
             */
            if (arr[j + height][i]  === '+' && arr[j + height][i2] === '+') {
                rectangles.push({h: height - 1, w: width});   
                break;      
            }

            nextPlus++;
            if (nextPlus >= plusArr.length) {
                break;
            }
        }
    }

    /* Result forming */
    i = 0;
    while (i < rectangles.length) {
        let topAndBottom = String.prototype.concat('+', '-'.repeat(rectangles[i].w), '+\n');
        let filler = String.prototype.concat('|', ' '.repeat(rectangles[i].w), '|\n');
        yield String.prototype.concat(topAndBottom, filler.repeat(rectangles[i].h), topAndBottom);
        i++;
    }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
