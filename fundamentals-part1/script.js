
/*
Values - Most basic unit of information in programming
variable - container of data.
variable conventions and rules:
    1. camelCase, PascalCase, underscore.
    2. variable names are written using letters, numbers, underscores and dollar sign
    3. cannot start with number
    4. Cannot use reserved words(function, new etc.)
    5. uppercase for constants.


    Data Types:
        A. Referenced:

        B. Primitives:
            1.Numbers - floating
            2. Strings - sequence of characters
            3. Boolean - Logical Type used for decision making
            4. undefined -
            5. null
            6. Symbol
            7. Big Int

    JavaScript has a feature called dynamic typing - Do not have to manually define variable
    type(data type is defined by value not variable).
    typeof - built-in function that determines the type of value stored in variable
    JS BUG - typeof null returns object instead of null. Has not changed due to legacy systems.


    Strings:
      type coercion - Converting a value to string so it can be concatenated to the rest of the string.
       Template literals - `Hello, my name is ${firstName}`;

       new line - \n\

       OPERATORS:
        1. arithmetic: +, -, /, %, *, **
        2. comparison operators
        equality operator: strict(===) does not coerce types. loose(==) does coerce types.

/*

                      CODING CHALLENGE 1

Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.

*/

/*
let marksMass = 78;
let marksHeight = 1.69;
let johnsMass = 92;
let johnsHeight = 1.95;


let marksBMI = marksMass / marksHeight ** 2;
let johnsBMI = johnsMass / johnsHeight ** 2;
let markHigherBMI = marksBMI > johnsBMI;

console.log('Mark\'s BMI is ' + marksBMI);
console.log('John\'s BMI is ' + johnsBMI);
console.log(markHigherBMI);
marksMass = 95;
marksHeight = 1.88;
johnsMass = 85;
johnsHeight = 1.76;

marksBMI = marksMass / marksHeight ** 2;
johnsBMI = johnsMass / johnsHeight ** 2;
markHigherBMI = marksBMI > johnsBMI;

console.log('Mark\'s BMI is ' + marksBMI);
console.log('John\'s BMI is ' + johnsBMI);
console.log(markHigherBMI);
*/

/*

                        CODING CHALLENGE 2

Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement 



*/


let marksMass = 78;
let marksHeight = 1.69;
let johnsMass = 92;
let johnsHeight = 1.95;


let marksBMI = marksMass / marksHeight ** 2;
let johnsBMI = johnsMass / johnsHeight ** 2;
let markHigherBMI = marksBMI > johnsBMI;

console.log(`Mark's BMI is ${marksBMI}`);
console.log(`John's BMI is ${johnsBMI}`);

if(markHigherBMI)
    console.log(`Mark's BMI is greater than John's.`);
else
console.log(`John's BMI is greater than Mark's.`);

marksMass = 95;
marksHeight = 1.88;
johnsMass = 85;
johnsHeight = 1.76;

marksBMI = marksMass / marksHeight ** 2;
johnsBMI = johnsMass / johnsHeight ** 2;
markHigherBMI = marksBMI > johnsBMI;

console.log(`Mark's BMI is ${marksBMI}`);
console.log(`John's BMI is ${johnsBMI}`);
if(markHigherBMI)
    console.log('Mark\'s BMI is greater than Joh\'s.');
else
console.log(`John's BMI is greater than Mark's.`);


/*

                            CODING CHALLENGE 3

There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

*/

/* 
const dolphinGameScore1 = 96;
const dolphinGameScore2 = 108;
const dolphinGameScore3 = 89;

const koalaGameScore1 = 88;
const koalaGameScore2 = 91;
const koalaGameScore3 = 110;

const dolphinAvgScore = (dolphinGameScore1 + dolphinGameScore2 + dolphinGameScore3) / 3;
const koalaAvgScore = (koalaGameScore1 + koalaGameScore2 + koalaGameScore3) / 3;

if(koalaAvgScore === dolphinAvgScore){
    console.log('There is a draw.');
} else if(koalaAvgScore > dolphinAvgScore){
    console.log('Koala wins the competition');
} else {
    console.log('dolphin wins the competition');
} */

const dolphinGameScore1 = 97;
const dolphinGameScore2 = 112;
const dolphinGameScore3 = 101;

const koalaGameScore1 = 109;
const koalaGameScore2 = 95;
const koalaGameScore3 = 106;

const dolphinAvgScore = (dolphinGameScore1 + dolphinGameScore2 + dolphinGameScore3) / 3;
const koalaAvgScore = (koalaGameScore1 + koalaGameScore2 + koalaGameScore3) / 3;


// BONUS 1 AND 2    
if(koalaAvgScore >= 100 && dolphinAvgScore >= 100 && koalaAvgScore === dolphinAvgScore){
    console.log('There is a draw.');
}else if(koalaAvgScore >= 100 && koalaAvgScore > dolphinAvgScore){
    console.log('Koala wins the competition');
} else if(dolphinAvgScore >= 100 && dolphinAvgScore > koalaAvgScore){
    console.log('dolphin wins the competition');
} else {
    console.log('No team won the competition because both averages are less than one hundred.');
}


/*

                            CODE CHALLENGE 4

Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.
Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
this. It's not allowed to use an if/else statement � (If it's easier for you, you can
start with an if/else statement, and then try to convert it to a ternary
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430
Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2
§ Value X is between 50 and 300, if it's >= 50 && <= 300 �


*/

/* const bill = 275;
const tip = (bill >= 50 && bill <=300) ? bill * .15 : bill * .20;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value
${bill + tip}`); */

const bill = 40;
const tip = (bill >= 50 && bill <=300) ? bill * .15 : bill * .20;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value
${bill + tip}`);