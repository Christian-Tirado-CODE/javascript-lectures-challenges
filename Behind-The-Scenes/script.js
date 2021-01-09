'use strict';


/*
    JavaScript definition:
    It is a high-level, prototype-based object oriented, multi-paradigm, interpreted  or just-in-time compiled,
    dynamic, single-threaded, garbage-collected programming language with first-class functions and a non-blocking
    event loop concurrency model.

    High-level - The programming language does not have to manually manage resources(manually ask for memory to create a variable)
    PRO: Language is easier to use.
    CON: Language is not as efficient/optimized as low-level languages.
    Garbage Collection - tool that takes memory management away from developers. It is a program that removes old un-used objects.

    Interpreted or Just-in-time compiled - Converting program into machine code.
    
    multi-paradigm - An approach/mindset of structuring code, which will direct your coding style/technique.
    3 popular paradigms - Procedural, Object-oriented, functional

    PROTOTYPE-BASED OBJECT-ORIENTED - Every object inherits prototype with all the methods

    First-class functions - Functions are simply treated as variables. We can pass them into other functions, and return them from functions.
    
    Dynamically-Typed - No data type definitions. Types becomes known at runtime.
    Data type of variable can be reassigned.
    TypeScript makes JS static Typed.

    Single-Threaded - JS can only do one thing at a time.
    That is why it uses the concurency model = how the JavaScript handles multiple tasks happening at the same time.
    A thread is like a set of instructions that is executed in the computers CPU. It is where our code is executed in the machine's processor.
   A long running task can block the single thread. However, we want a non-blocking behaviour! JS achieves that with the event loop.
    
   Non-blocking event loop - Takes long running tasks(fetching data from server), executes them in the "background", and puts them back in the 
   main thread once they are finished.
    


   JavaScript Engine - Program that executes JS code.
   Every browser has it's own JS engine. The most well-known is google's V8 engine which powers chrome and node.js

   JS engine consists of:
   CALL STACK: WHERE OUR CODE IS EXECUTED USING EXECUTION CONTEXTS.
   HEAP: UNSTRUCTURED MEMORY POOL WHICH STORES ALL THE OBJECTS OUR PROGRAM NEEDS.
   
   COMPILATION: ENTIRE CODE IS CONVERTED INTO MACHINE CODE AT ONCE, AND WRITTEN TO A BINARY FILE THAT CAN BE EXECUTED BY A COMPUTER. This is a 2-step process.
   INTERPRETATION: Interpreter runs through the source code and executes it line by line. This is a one step process where code is converted into machine code and
   immediately executed. Interpreted languages are much slower than compiled languages. JS used to be an interpreted language.

   Modern JS engines uses a hybrid of the two approaches called Just-In-Time compilation: Entire code is converted into machine code at once, then executed immediately.
   It's a two-step process that does not produce a portable file.
   When the code enters the engine:
      1. Parsing: It is parsed(read) into a data structure called the abstract syntax tree which is later used to generate the machine code.
            This tree has nothing to do with the DOM. It is just an entire representation of our code inside the engine.
      2. Compilation: AST is converted into machine code.
      3. Machine code is immediately executed. Execution happens in the call stack.
           An initial un-optimized version of machine code is executed so it can start running the program as fast as possible but then it is continuosly optimized and recompiled during the already running program execution.
           The un optimized code is replaced by the optimized one without stopping execution.
      
        JS runtime(in the browser):
          It is a container including all the things that we need to use JavaScript. It consists of:
            1. JS engine
            2. Web API's - functionalities provided to the engine but are not part of the language. Accessible on the window object.
            3. Callback Queue - Data Structure that contains all the callback functions that are ready to be executed. Example: DOM event handlers
                When an event is triggered, the callback function is placed in the queue and waits for the call stack to be empty. When its empty the function is placed in the stack.
                This happens because of the event loop(It takes callback functions from the callback queue and places them in the call stack to be executed).
            The JS runtime can exist outside the browser, for example in node js the runtime is similar but instead of having web api's it has C++ bindings and a thread pool
           
            
            
            Execution Context and The Call Stack:
              Execution Context - Environment in which a piece of JS code is executed. Stores all the necessary information for some code to be executed.
              Top-level code - any code not inside any function.
              When a compiled program runs, a global execution context is created for top-level code.
              Every program will have only one global execution context. 
              Once the top-level code executes the execution of functions and callbacks begin. For each function call a new execution context is created
              containing all the information neccessary for that function to execute.
              All the current execution contexts make up the call stack.
              The execution context consists of:
                1. Variable Environment: 
                   a. let, const and var declarations
                   b. Functions
                   c. arguments object - all the arguments passed into the function
                2. Scope chain - References to variables located outside of the current function.
                3. this keyword
                  Those three things are generated during "creation phase",  right before execution.
                  NOTE: Execution Contexts belonging to arrow functions do not have an arguments object and the this keyword. Instead, they have access to the
                  arguments object and this keyword of the closest regular function parent.
                
                  CALL STACK- "Place" where execution contexts get stacked on top of each other, to keep track of where we are in the execution.
                   code runs in the call stack.


                   
                   
                   Scope And The Scope Chain:

                    Scoping - How our program's variables are organized and accessed. "Where do variables live?" or "Where can we access a certain variable, and where not?"
                    Lexical  Scoping - Scoping is controlled by placement of functions and blocks in the code.
                    Scope - Space or environment in which a certain variable is declared(variable environment in case of functions). There is global scope, function scope and block scope.
                    Scope of a variable - Region of our code where a certain variable can be accessed.
                    The 3 types of scope:
                        1. Global: 
                           a. Outside of any function or block
                           b. Variables declared in global scope are accessible everywhere.
                        2. Function:
                            a. Variables are accessible only inside function, NOT outside.
                            b. Also called local scope.
                        3. Block:
                            a. Variables are accessible only inside block
                            b. However, this only applies to let and const variables.
                            c. Functions are also block scoped(Only in strict mode).

                        Scope Chain - If program can't find a variable in the current scope it will look up on the OUTER(not inner) scopes to find it.
                    
                        Scope chain vs  Call Stack:
                        Call Stack is in charged of the order in which functions were CALLED where as 
                        the Scope Chain deals with the order in which functions are WRITTEN IN THE CODE.
                        
                       The Scope Chain has nothing to do with the order of the execution contexts in the call stack. What it does is get the variable environment 
                       from the execution contexts.

                        */


                      // SCOPING IN PRACTICE


                       function calcAge(birthYear){
                         console.log(firstName); // variable not found in current scope so JS does a variable lookup.
                         const age = 2020 - birthYear;

                          function printAge(){
                            const output = `${firstName}, you are ${age} years old, born in ${birthYear}`; // variable not found in current scope so JS does a variable lookup.
                            console.log(output);

                            if(birthYear >= 1981 && birthYear <= 1996){
                               const str = `Oh, and you're a millenial, ${firstName}`;
                               console.log(str);

                               function add(a, b){
                                return a + b;
                               }
                            }
                           // console.log(str); reference error: str is block scoped.
                           // console.log(add(2, 3)) reference error: functions are block scoped since ES6.
                          }
                          printAge();


                         return age;
                       }

                       const firstName = 'Jonas';
                       calcAge(1991);
                       //console.log(age); reference error: age is not defined in the global scope but on function scope(using strict mode).


                       /* HOISTING:

                        hoisting: makes some types of variables accessible/usable in the code before they are actually declared.
                        Variables are lifted to the top of their scope. Before execution, code is scanned for variable declarations, 
                        and for each variable a new property is created in the variable environment object.

                         The following are hoisted:
                          Function declarations: Yes, initial value of <function>, block scope(using strict mode).
                          var declarations: Yes, initial value of undefined, function scope
                          let and const variables: No, initial value<uninitialized>and placed in TDZ(Temporal Death Zone = Region of a scope 
                                                  where a variable is defined but can't be used in any way. It is important because
                                                  it makes it easier to avoid and catch errors. Accessing variables before declaration
                                                  is bad practice), block scope.
                          Function Expressions/ Arrow Functions: Depends if using var(undefined), let or const(TDZ)

                          Why hoisting?
                          The creator of JS wanted to be able to access functions before function declarations.
                            

                          BEST PRACTICES(Video: "Hoisting and TDZ in practice"):
                          1. Use let/const instead of var
                          2. variable declarations should begin at the top of every scope.
                          3. Function declarations should go at the beginning.
                          4. Functions should be declared before being called.

                          window = global object of JS in the browser. variables created with var will create properties in the window object.
                          

                          THE THIS KEYWORD: 
                            this - Special variable that is created for every execution context(every function).
                                  Takes the value of (point to) the "owner" of the function in which the this keyword is used.
                                  'this' is not static. It depends on how the function is called, and its value is only assigned when the function is
                                  actually called.
                              The this keyword can be used in five different ways:
                               1. Method:  this = Object that is calling the method.
                               2. Simple function call: this = undefined(in strict mode.Otherwise, window(in the browser))
                               3. arrow functions: this = this of surrounding function(lexical this)
                               4. Event listener: this = DOM element that the handler is attached to
                               5. new, call, apply, bind: Explained later in the course

                              'this' does NOT point to the function itself, and also NOT to its variable environment. 
                       
                            Technique: using const self = this outside function. This is useful when using this inside a function that is inside an object method.
                            A newer solution is to use an arrow function.
                            
                            
                            PRIMITIVES VS OBJECTS(REFERENCE TYPES): Watch these again!!

                            OBJECTS: 
                               1. Object Literals
                               2. Arrays
                               3. Functions
                               4. Many more

                              Primitives: 
                              1. number
                              2.boolean
                              3. string
                              4. null
                              5. undefined
                              6. Symbol
                              7.BigInt

                              When we create a variable to store an object the identifier points to a memory address in the call stack
                              which in turn points to a memory address in the heap where the object is actually stored.
                           
                                You can copy an object using Object.assign({}, <object's name>);
                                This is only a shallow copy though. This means that an object inside of the object will be passed a reference and not be copied.
                                
                              */