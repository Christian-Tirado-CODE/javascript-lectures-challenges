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


