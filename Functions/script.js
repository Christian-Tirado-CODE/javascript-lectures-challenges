'use strict';

// DEFAULT PARAMETERS
// ASSIGN DEFAULT VALUES AND EVEN USE EXPRESSIONS TO SET THE DEFAULT VALUE. YOU DO NEED TO SET THE EXPRESSION THAT USES ANOTHER PARAMETER AFTER IT(price has to go after numPassengers);
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// You have to set undefined to a parameter you want to skip and therefore use its default value.
createBooking('LH123', 1000);
createBooking('LH123', undefined, 1000);

//PASSING ARGUMENTS TO FUNCTION BY VALUE VS REFERENCE

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2473934433,
};

const checkIn = function(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2473934433) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight); // since flight is a primitive, the function creates a copy of the value of variable flight.
console.log(jonas); // since jonas is a reference, the function has the reference to the memory address in the heap therefor it is mutated.

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// In JS, we pass a reference to a function but not BY reference.

// First-Class Functions and Higher-Order Functions

// First-Class Functions - Functions that are treated as values. This is possible beacause it is another "type" of object.
// Functions can be stored in variables/properties, passed as arguments to OTHER functions, Return functions FROM functions, Call methods on Functions.

//Higher-Order Functions - A function that receives another function as an argument, that returns a new function, or both.

// Functions That Receives Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function

const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // functions have properties too!
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// Reasons why JS uses callbacks all the time:
//   1. Makes it easier to split code into reusable and interconnected parts.
//   2. Allows us to create "abstractions". An abstraction is when you don't focus on the implementation of a method but on the result.

// Functions That Return Functions

/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}; */


const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Christian'); 
greeterHey('Steven');// greeterHey has access to greeting parameter because of closures.

greet('Hello')('Jonas');


//Call And Apply Method

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name){
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
    }
}

lufthansa.book(239, 'Christian Tirado');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
    name: 'Eurowings',
    iataCode: 'EW',
    bookings: []
}

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}

const book = lufthansa.book; // Copying method to variable.
//book(23, 'Sarah Williams'); // returns TypeError: cannot read property airline...
// This happens because the book method is going to be saved as a function in the book variable therefore the 
//'this' keyword is going to be set to undefined.

// The call, bind and apply keyword can explicitly assign the 'this' keyword to another object when we are copying methods like the example above.

// Call Method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings); 

//Apply Method
const flightData = [583, 'George Cooper'];

book.apply(swiss, flightData);
console.log(swiss);

// Apply is no longer used because of the spread operator.
book.call(swiss, ...flightData);

// Bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams'); 
const bookEW23 = book.bind(eurowings, 23); // The flight number 23 can be pre-defined so when you call the function it does not have to be specified. 
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// bind() is also useful when using objects with event listeners.

lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // The this keyword is set to the event target.
// This is because the this keyword will point to the element in which the event handler is attached to.


//Partial application(pre-setting parameters). In this case, we don't care about the this keyword therefore it is set to null.
// The order of the arguments is important!!!!!!
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);// is equivalent of addVAT =  value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = rate => value => value + value * rate;
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

/*
            CODING CHALLENGE 1:
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section �
GOOD LUCK �
*/

/* const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    registerNewAnswer(){
        let options = '';
        for(const o of this.options){
            options += o + '\n';
        }

        const answer = Number(prompt(`${this.question}\n${options}(write option number)`));

        if(typeof answer === 'number' && answer >= 0 && answer <= this.answers.length){
            this.answers[answer] = this.answers[answer] + 1;
        }
        this.displayResults('array');
    },

    displayResults(type){

        type === 'string' ? console.log('Poll results are ', ...this.answers) : console.log(this.answers);
    }
} */

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    registerNewAnswer(){
        const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
        

        typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
        this.displayResults();
        this.displayResults('string');
    },

    displayResults(type = 'array'){
        if(type === 'array'){
            console.log(this.answers);
        } else if(type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    }
};

    document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

//Bonus
//[5, 2, 3]
// [1, 5, 3, 9, 6, 1]

poll.displayResults.call({answers: [5, 2, 3]});
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});


// IIFE's

(function () {
    console.log('This will never run again');
})();


//CLOSURES 

const secureBooking = function() {
    let passengerCount = 0;
    
    return function(){
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();

booker();
booker();
booker();


// Closure is the closed-over variable environment of the execution context in which a function was created,
// even though the execution context is gone.
// A closure gives a function access to all the variables of its parent function, even after that parent function has returned.
// The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// A closure makes sure that a function doesn't  loose connection to variables that existed at the function's birth place.
// We do not manually create closures, this is a JavaScript feature.
// Closure has priority over scope chain.
//console.dir(booker); Allows to see scope and closures.

// Closure Examples

// Example 1
let f;

const g = function(){
    const a = 23;
    f = function(){
        console.log(a * 2);
    };
};

const h = function(){
    const b = 777;
    f = function(){
        console.log(b * 2);
    };
};

g();
f();
console.dir(f);


// Re-assigning f function
h();
f();
console.dir(f);

// Example 2

const boardPassengers = function(n, wait){
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
}

boardPassengers(180, 3);


/*
        CODING CHALLENGE 2: 

        This is more of a thinking challenge than a coding challenge �
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
 
*/

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    
    document.querySelector('body').addEventListener('click', function(){
        header.style.color = 'blue';
    });
    })();
