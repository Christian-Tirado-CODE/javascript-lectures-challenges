'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implementing Smooth Scrolling
// Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  /*  window.scrollTo(
    s1coords.left + s1coords.pageXOffset,
    s1coords.top + window.pageYOffset
    );
  }); 

  window.scrollTo({
    left: s1coords.left + s1coords.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });
*/

  // For Modern Browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

/*
  document.querySelectorAll('.nav__link').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      console.log('LINK');
        
      const id = this.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    });
  });
  */
// The code above is not performant because if we have 10,000 navlinks(elements) we are creating a function for each one.
// That is why event delegation is a better approach(place event listener on parent element of all links).
// REMEMBER: An event bubbles up to the parent and we can use the event target to know where it originated.

// 1. Add event listener to common parent element.
// 2. Determine what element originated the event.
// The following code is the better way to do it:
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

//Passing "arguments" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
/*
// Sticky navigation using the Intersection Obseerver API 
const obsCallback = function(entries, observer) {
    // This callback is going to be called each time the observed(target) element is intersecting the root.
  entries.forEach(entry => {
      console.log(entry);
  });
  };

const obsOptions = {
  root: null, // The viewport
  threshold: [0, 0.2] // When the observed element intersects the viewport at 10%(0.1) of the threshold the callback will be invoked.
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); 
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver
(revealSection, {
  root: null,
  threshold: 0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
// The Network tab in the dev tools is very important. You can set a slow 3G connection to simulate slow speed connection.

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
   const [entry] = entries;
   console.log(entry);

   if(!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src; 
  

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function(e){
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;


const createDots = function(){
  slides.forEach(function(_, i){
     dotContainer.insertAdjacentHTML(
       'beforeend',
       `<button class="dots__dot" data-slide="${i}"></button>`
     );
  });
};



const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');
}

const goToSlide = function(slide){
  
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  
};



// Next slide
const nextSlide = function(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function(){
  if(curSlide === 0)
    curSlide = maxSlide - 1;
  else
    curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);

}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
}

init();



btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft')
      prevSlide();
  e.key === 'ArrowRight' && nextSlide();

});

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
     const {slide} = e.target.dataset;
     goToSlide(slide);
     activateDot(slide);

  }
});
};

slider();


/*
  // Types of Events and Event Handlers
  const h1 = document.querySelector('h1');

  // addEventListener advantages: You can replace the callback function and you can remove the listener.


  const alertH1 = function(e){
    alert('addEventListener: Great! You are reading the heading :D');

    h1.removeEventListener('mouseenter', alertH1);
  };

  h1.addEventListener('mouseenter', alertH1);

  // Event Propagation: Bubbling and Capturing

  // Three phases: Capturing phase, Target phase, Bubbling phase

  // It is important to know the phases because we figure out that the event happens/affects the each of the parent elements.

*/

// How The DOM realy works
// DOM is the interface between JS and the browser.
// Allows us to make JS interact with the browser.
// We can write code to create, modify and delete HTML elements
// set styles, classes and attributes and listen/respond to events.
// DOM tree is generated from an HTML document, which we can then interact with.
// DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree.

//The DOM API is organized the following way:
// Each node in the DOM tree is of type Node. Each node is represented by object.
// ***Types of Nodes: Elemen(child nodes: HTMLElement which in turn has two child nodes: HTMLButtonElement and the HTMLDivElement), Text, Comment, Document.
// ***Inheritance: all the child nodes will get access to the properties/methods of their parent nodes.
// The DOM allows all the Node types to listen to events by providing the eventTarget Node type, which is parent of the Node and window object. Because all node types inherit from eventTarget all can use event listeners.

//Selecting, Creating and Deleting Elements
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//getElementsByTagName() returns a HTML Collection not a NodeList. The collection updates if a change happens in the DOM.

// Creating and Inserting
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

header.before(message);
header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(
  getComputedStyle(message).height + 30 + 'px'
);

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // Absolute path
console.log(logo.getAttribute('src')); // Relative path

const link = document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // querySelectorAll will go as deep as it can in the DOM tree to find elements that match the query string. Also, elements with the same class not belongin to the h1 will not be selected.
console.log(h1.childNodes);
console.log(h1.children); // Elements only. Returns an HTML collection
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: siblings
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children); // All the siblings including itself.
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/

//Lifecycle DOM events
document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e);
});
/* 
window.addEventListener('beforeunload', function(e){
e.preventDefault();
console.log(e);
e.returnValue = '';
}); */

// Efficient Script Loading: Defer and Async