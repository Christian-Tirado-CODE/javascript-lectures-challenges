
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