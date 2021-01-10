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




