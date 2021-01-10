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

