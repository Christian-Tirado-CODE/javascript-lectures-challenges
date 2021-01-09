'use strict';

// What is OOP?
// It is a programming paradigm based on the concept of objects.
// We use objects to model(describe) real world or abstract features.
// Objects may contain data(properties) and code(methods). By using objects, we pack data and the corresponding behaviour into one block
// In OOP, objects are self-contained pieces/blocks of code
// Objects are building blocks of applications, and interact with one another.
// Interactions happen through a public interface(API): methods that the code outside  of the object can access and use to communicate with the object.
// OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain(avoid "spaguetti code");

// Classes - Blueprints that are used to create objects. properties are descriptions of a subject and methods which are the behaviour associated with the data.
// Instances - Objects created from a class that contains real data.

// 4 OOP fundamental principles:
// Abstraction - ignoring or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with 
// details that don't really matter to our implementation.
// Encapsulation - Keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods CAN be exposed as a public interface(API).
// Reasons for encapsulation - Prevents external code from accidentally manipulating internal properties/state. Also, Allows to change internal implementation without the risk of breaking
// external code.
// Inheritance - Makes all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to REUSE common logic and to
// model real-world relationships.
// Polymorphism - A child class can overwrite a method it inherited from a parent class(it can be more complex but Keep It Simple).

// OOP in JS

// Prototypes instead of Classes
// All objects in JS are linked to a certain prototype object.
// Prototypal inheritance: Prototypes have properties and methods in which the objects linked have access to.
// Inheritance in JS differs from traditional because an instance is inheriting from a prototype instead of a class inheriting from another class.
// Behaviour is delegated to the linked prototype object.
// Example of Prot. Inheritance: Array methods. Array.prototype is the prototype of all array objects we create.
// There are 3 ways of implementing prototypal inheritance in JS: Constructor functions, ES6 classes(syntactic sugar) and Object.create()

// Function Constructors

const Person = function(firstName, birthYear){
   // Instance properties
    this.firstName = firstName;
   this.birthYear = birthYear;

   // Never assign a method to a Constructor function because it will create a copy for every instance. It hinders code performance.

   /* this.calcAge = function(){
       console.log(2037 - this.birthYear);
   }; */
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

//1. New {} is created
//2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
// These objects are instances of Person Contructor function

//const jay = 'Jay';
console.log(jonas instanceof Person);
//console.log(jay instanceof Person);

// Prototypes

console.log(Person.prototype);
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));
// Person.prototype is not the prototype of Person but it is what it's going to be used as the prototype of the objects created with the Constructor function.

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// Prototypal Inheritance and The Prototype Chain
// Recap: Constructor function has a prototype(.prototype) property which can hold properties. The prototype has a reference back to the Constructor function(using .constructor).
// The .prototype property is not the prototype of Constructor function but of the objects created by the Function constructor.
// The new operator: 1. Creates an empty object, 2. sets the this keyword in the constructor function call to the new object, 3. links the new object(__proto__property) to the constructor function's prototype property and 4. the new object is returned from the constructor function call.
// An object's __proto__ always points to an object's prototype.
// This is how it works with ES6 classes too but not with Object.create().

//Prototype Chain 
// If a method is not found in an object it will check it's prototype.
// All objects inherit from the Object constructor. The Object constructor's __proto__ points to null.

console.log(jonas.__proto__);
//Object.prototype(top of the prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);
// We notice that prototypal inheritance allows us to reuse code.
// The reason we can call methods on functions is that they are objects and objects have prototypes.

/*
            CODING CHALLENGE #1:

1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK � 
*/

const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed}km/h`);
}
Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed}km/h`);
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();


// ES6 Classes

 //const PersonCl = class {}

 class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Methods will be added to .prototype property
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.firstName}`);
    }

    get age(){
        return 2037 - this.birthYear;    
    }

    // Set a property that already exists
    set fullName(name){
        console.log(name);
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }
    get fullName(){
        return this._fullName;
    }

    //static methods
    static hey(){
        console.log('Hey there');
        console.log(this);
    }
 }

 const jessica = new PersonCl('Jessica Davis', 1996);
 console.log(jessica);
 jessica.calcAge();

 console.log(jessica.__proto__ === PersonCl.prototype);

 /* PersonCl.prototype.greet = function(){
     console.log(`Hey ${this.firstName}`);
 } */
 jessica.greet();

// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode


// Getters and Setters

const walter = new PersonCl('Walter White', 1965);


const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        this.movements.push(mov);
    }
}

console.log(account.latest);
account.latest = 50;

console.log(account.movements);

//Static Methods
// Methods that belong to the Function Constructor and are not part of the .prototype property
// Examples: Array.from(), Number.parseFloat()
Person.hey = function(){
    console.log('Hey there');
};

Person.hey();
//jonas.hey();



// Object.create()

const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

/*
            CODING CHALLENGE 2:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
GOOD LUCK �
*/

/* const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
} */

class CarCl {
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }
   accelerate(){
        this.speed += 10;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }
    brake(){
        this.speed -= 5;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }

    get speedUS(){
        return this.speed/1.6;
    }

    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

const car3 = new CarCl('Ford', 120);


car3.accelerate();
car3.accelerate();


// Inheritance between "classes": Constructor Functions

const Student = function(firstName, birthYear, course){
    Person.call(this, firstName, birthYear); //inherit the properties: Using the call method to set the this keyword on the regular function call. 
    this.course = course;
}

// To inherit methods we link the student prototype with the Person prototype using Object.create()
Student.prototype = Object(Person.prototype);

Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person); 

console.dir(Student.prototype.constructor);


/*
            CODING CHALLENGE 3:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism �
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK �
*/


const EV = function(make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
const ev1 = new EV('Tesla', 120, 23);


 EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`Tesla going at ${this.speed}
    km/h, with a charge of ${this.charge}%`);
}
 

ev1.accelerate();
ev1.brake();
ev1.chargeBattery(90);
console.log(ev1);

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course){
        // Always needs to happen first!
        super(fullName, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }
    calcAge(){
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`)
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();




//Inheritance between classes using Object.create():


const StudentProto = Object.create(PersonProto);

StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function(){
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();



// Another Class Example

class Account {
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        // Protected property
        this._movements = [];
        this.locale = navigator.language;

        
    }

    getMovements(){
        return this._movements;
    }

    deposit(val){
        this._movements.push(val);
    }

    withdraw(val){
        this.deposit(-val);
    }

    _approveLoan(val){
        return true;
    }
    requestLoan(val){
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log('Loan approved');
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
//acc1._approveLoan(1000); // This method shouldn't be accessible like this.
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1.pin);// This property shouldn't be accessible like this.


// Encapsulation: Protected properties and Methods


// Encapsulation: Private Fields And Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// There is also the static method
class Account2 {
    // 1. Public fields(instances)
    locale = navigator.language;
    _movements = [];
    

    // 2) Private fields
    #movements = [];
    #pin;
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // Protected property
        //this._movements = [];
        //this.locale = navigator.language;

        
    }

    // 3) Private methods
    getMovements(){
        return this.#movements;
    }

    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }

    _approveLoan(val){
        return true;
    }
    requestLoan(val){
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log('Loan approved');
            return this;
        }
    }

    // 4) Private Methods
   /*  #approveLoan(val){
        return true;
    } */
    static helper(){
        console.log('Helper');
    }
}

const acc2 = new Account2('Jonas', 'EUR', 1111);
//console.log(acc1.#movements);
//Account.helper();

//Chaining
// To enable chaining return the this keyword after the method.
acc2.deposit(300). deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);


/*
                    CODING CHALLENGE 4:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK �
*/



class EVC1 extends CarCl {
    //Private field
    #charge;

    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }
    
    accelerate(){
        this.speed += 20;
        this.charge--;
        console.log(`${this.make} going at ${this.speed}
        km/h, with a charge of ${this.#charge}%`);
        return this;
    }

    brake(){
        this.speed -= 10;
        console.log(`${this.make} going at ${this.speed}km/h`);
        return this;
    }

}

const ev2 = new EVC1('Rivian', 120, 23);

ev2.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(ev2.speedUS);