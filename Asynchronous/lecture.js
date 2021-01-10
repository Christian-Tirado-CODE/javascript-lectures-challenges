'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function(msg){
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

const renderCountry = function(country, className = ''){
  
  const html = `
  <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
          <h3 class="country__name">${country.name}</h3>
          <h4 class="country__region">${country.region}</h4>
          <p class="country__row"><span>👫</span>${(
            country.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${
            country.currencies[0].name
          }</p>
        </div>
      </article>
  `;

countriesContainer.insertAdjacentHTML('beforeend', html);
// countriesContainer.style.opacity = 1;



}

///////////////////////////////////////

// Asynchronous code = Executed after a task runs in the "background" finishes.
// Async. is non-blocking
// Execution doesn't wait for asynchronous task to finish it's work.
// Async. Coordinates behaviour of a program over a period of time.
// Callback functions alone do NOT make code asynchronous.
// Most important usage of async. are AJAX calls.

// AJAX: Allows us to communicate with remote web servers in an asynchronous way.
// With AJAX calls , we can request data from web servers dynamically.
// Client sends HTTP requests to a web server(which has an API that has the data) and sends back a response.
// API - Piece of software that can be used by another piece of software, in order to allow applications to talk to each other.
// Examples - DOM API, Geolocation API, Our own Class API.
// Online(web) API - Application running on a server, that receives requests for data, and sends data back as response.
// We can build our own API's or use a third party API's.
// API data format - JSON data format(javascript object converted into a string).

// Oldest way of making AJAX calls
/* 

const getCountryData = function(country){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

    request.send();
request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText); // Converting string to JS object using JSON.parse()
  console.log(data);

  const html = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

});

} */

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');


// How The Web Works: Requests and Responses
// 
// Client-server architecture: Client sends request to the web server and the server sends back a response.
// API endpoint consists of: Protocol(http/https), the domain name and a resource.
// 1. Browser makes request to DNS, which receives the domain name and returns the web server's IP address and Port number(sub-address).
// 2. TCP(Transmission Control Protocol)/IP(Internet protocol) socket connection is established between the client and the server.
// 3. Client makes HTTP request Hyper Text Transfer Protocol -  It is a communication protocol(System of rules that allow two parties to communicate).
// Start line: HTTP method(GET, POST, PUT, DELETE), request target, HTTP version. Example: GET / rest/v2/alpha/PT HTTP/1.1
// Request Headers
// Request Body
// HTTPS is encrypted using TLS?
// HTTP Response: Start line = HTTP version, status code, status message
// TCP - Break down requests into small packets.
// IP - Sends and routes these packets through the internet.


// Callbacks(and the callback hell):
// Too many nested callbacks to perform asynchronous code.
// Callbacks makes it easier for bugs occur and also makes code hard to maintain.




const getCountryDataAndNeighbour = function(country){
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    
    request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText); // Converting string to JS object using JSON.parse()
  console.log(data);

  // Render country
  renderCountry(data);

  // Get neighbour country 
    const [neighbour] = data.borders;

    if(!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function(){
    const data2 = JSON.parse(this.responseText);
    console.log(data2);

    renderCountry(data2, 'neighbour');
    });
});
};


//getCountryDataAndNeighbour('portugal');
//getCountryDataAndNeighbour('usa');



// Promises

// Solves the callback hell
// Promise: An object that is used as a placeholder for the future result of an asynchronous operation.
//          It can be thought of as a container for an asynchronously delivered value(future value).
//           The result of that future value can be the response from AJAX call.
// We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.
// Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell.
// The Promise lifecycle: Pending(before the future value is available. Async task is executing), settled(asynchronous task has finished. Two posible values: fullfilled(Success! The value is now available) or rejected(An error happened)).
// We are able to handle differents states in code.
// We consume a Promise when we have a promise. Promises have to be built(fetch API already builds and returns a promise) before they are consumed.
// Fetch API - Modern way of making AJAX calls.

const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`);

console.log(request);


const getJSON = function(url, errorMsg = 'Something went wrong'){
  return fetch(url).then(response => {
    if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  })
};


// Consuming Promises:
/* const getCountryData = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if(!response.ok)
        throw new Error(`Country not found (${response.status})`);


      return response.json();
    })
    .then(data =>renderCountry(data[0]))
    .catch(error => {
          renderError(`Something went wrong ${error.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;

    });
}; */


const getCountryData = function(country){
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country Not Found')
  .then(data =>renderCountry(data[0]))
  .catch(error => {
        renderError(`Something went wrong ${error.message}. Try again!`);
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;

  });
}; 

btn.addEventListener('click', function(){
  getCountryData('portugal');
});


// HANDLING REJECTED REQUESTS - USE THE CATCH() METHOD. THE FINALLY() METHOD ALWAYS IS CALLED
// IT DOES NOT MATTER IF THE PROMISE WAS FULFILLED OR REJECTED.





// Asynchronous Behind The Scenes: The Event Loop
// It makes asynchronous behaviour possible(along with the web API's and the callback queue) in JS
// Asynchronous tasks(image loading, events, API calls) run in the web API's
// Event Loop Tick - Takes the first callback function from the callback queue and places it in the call stack.
// Decides which callback is executed: orchestration.
// Microtasks queue - It is where callbacks related to promises are placed. Has priority over the callback queue


const lotteryPromise = new Promise(function(resolve, reject){
    // This callback is named the 'executor' fuction
   
    console.log('Lottery draw is happening.');
    setTimeout(function(){
      if(Math.random() >= 0.5){
        resolve('You WIN!!!'); // this function set the promise as a fulfilled one. Inside we pass the fulfilled value which will be consumed by the then() method.
    } else {
        reject(new Error('You lost your money :(')); // Will be consumed by the catch handler method. You pass the error message inside the reject() method.
    }
    }, 2000);

});

// We mostly consume promises but ocassionaly build them to wrap old callback-based functions into promise based(promisifying)

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err)); 

//Promisifying setTimeout
const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  });
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1);
}).then(() => console.log('I waited for 1 second'));

// Immediately resolved/rejected promise
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));



// Promisifying the Geolocation API


const getPosition = function(){
  return new Promise(function(resolve, reject){
   /*  navigator.geolocation.getCurrentPosition(
        resolve(position),
    err => reject(err)); */
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getPosition().then(pos => console.log(pos));



/*
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own �
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path
2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that �)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
*/


// Consuming Promises with Async/Await

const whereAmIAsync = async function(country){
  //fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));
 
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  console.log(res);

  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
}
// Looks like synchronous code but behind the scenes we are using promises.

whereAmIAsync('portugal');
console.log('FIRST');