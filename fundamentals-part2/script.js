"use strict";

/*
strict mode - Prohibits certain bugs and also displays visible errors in the developer console.
Below is an example where strict mode alerts us of a bug


let hasDriversLicense = false;
const passTest = true;

if(passTest) hasDriverLicense = true; // bug in the variable name- missing s.
if(hasDriversLicense) console.log('I can drive!!!');

const interface = 'UI';
const private = 123;
*/

/*
   FUNCTIONS
     Used for: reusing code, receiving input data, transform it and outputting data.
     
     function declarations - stored in variables.
     function expressions - stored in variables.
     The difference is that function declarations can be called/invoked before they are defined.
     Most of the cases is a thing of preference but expressions force us to define before calling and
     storing every value in variables which help in keeping code structured and organized.

*/

/* 

            FUNCTION DECLARATIONS

function fruitProcessor(apples, oranges){
    console.log(apples, oranges);
    const juice = `There are ${apples} apples and ${oranges} oranges.`;

    return juice;
}

 */
//        FUNCTION EXPRESSIONS
/*  const fruitProcessor = function(apples, oranges){
        console.log(apples, oranges);
        const juice = `There are ${apples} apples and ${oranges} oranges.`;
    
        return juice;
    } */

// ARROW FUNCTIONS
/*
  Can be written in one line and without using return depending on the length of the code.
  This type of function does not have the this keyword.
*/

/*
const fruitProcessor = (apples, oranges) => {
    console.log(apples, oranges);
    const juice = `There are ${apples} apples and ${oranges} oranges.`;

    return juice;
}
*/

// FUNCTION CALLING FUNCTIONS

const cutPieces = function (fruit) {
  return fruit * 4;
};

const fruitProcessor = function (apples, oranges) {
  const applePieces = cutPieces(apples);
  const orangePieces = cutPieces(oranges);

  const juice = `There are ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;

  return juice;
};

console.log(fruitProcessor(2, 3));

/*
                            CODING CHALLENGE 1

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so
one average score per team).
A team only wins if it has at least double the average score of the other team.
Otherwise, no team wins!
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
§ To calculate average of 3 values, add them all together and divide by 3
§ To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores �
*/

/*const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;


let dolphinAvgScore = calcAverage(44, 23, 71);
let koalaAvgScore = calcAverage(65, 54, 49);

const checkWinner = function(avgDolphins, avgKoalas){
    if(avgDolphins >= 2 * avgKoalas)
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    else if(avgKoalas >= 2 * avgDolphins)
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    else 
        console.log(`No team won. Koala scored ${avgDolphins}  and Dolphins ${avgKoalas}`);
};

checkWinner(dolphinAvgScore, koalaAvgScore);

dolphinAvgScore = calcAverage(85, 54, 41);
koalaAvgScore = calcAverage(23, 34, 27);

checkWinner(dolphinAvgScore, koalaAvgScore);
*/
/*

                      CODING CHALLENGE 2

Steven is still building his tip calculator, using the same rules as before: Tip 15% of
the bill if the bill value is between 50 and 300, and if the value is different, the tip is
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns
the corresponding tip, calculated based on the rules above (you can check out
the code from first tip calculator challenge if you need to). Use the function
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data
below
3. Create an array 'tips' containing the tip value for each bill, calculated from
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can
actually be the returned value of a function! So you can just call a function as array
values (so don't store the tip values in separate variables first, but right in the new
array) �
*/

/*

const calcTip = function(bill){
    return bill >= 50 && bill <= 300 ? bill * .15 : bill * .20;
};
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills);
console.log(tips);
console.log(total);
 */

// OBJECTS

const christian = {
  firstName: "Christian",
  lastName: "Tirado",
  birthYear: 1999,
  calcAge: function () {
    this.age = 2020 - this.birthYear;
    return this.age;
  },
  hasDriversLicense: true,
  getSummary: function () {
    return `Christian is a ${this.calcAge()} year-old teacher, and he has 
        ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

christian.calcAge();
console.log(christian.age);
console.log(christian.getSummary());

/*
            CODING CHALLENGE 3

    Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall.      
*/

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();

mark.bmi > john.bmi
  ? console.log(`${mark.firstName + " " + mark.lastName}'s BMI (${mark.bmi}) 
    is higher than ${john.firstName + " " + john.lastName}'s (${john.bmi})!`)
  : console.log(`${john.firstName + " " + john.lastName}'s BMI (${john.bmi}) 
    is higher than ${mark.firstName + " " + mark.lastName}'s (${mark.bmi})!`);

/*
    
                CODING CHALLENGE 4  

Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
tips and total values (bill + tip) for every bill value in the bills array. Use a for
loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
tips and totals arrays �
Bonus:
4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
an argument. This function calculates the average of all numbers in the given
array. This is a difficult challenge (we haven't done this before)! Here is how to
solve it:
4.1. First, you will need to add up all values in the array. To do the addition,
start by creating a variable 'sum' that starts at 0. Then loop over the
array using a for loop. In each iteration, add the current value to the
'sum' variable. This way, by the end of the loop, you have all values
added together
4.2. To calculate the average, divide the sum you calculated before by the
length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array

*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
};

console.log(bills);
console.log(tips);
console.log(totals);
console.log(calcAverage(totals));


