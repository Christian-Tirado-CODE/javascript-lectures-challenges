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
