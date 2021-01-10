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