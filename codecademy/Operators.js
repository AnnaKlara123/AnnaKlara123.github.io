// else wird ausgegeben, wenn if false eintritt
let hungerLevel = 7;

if  (hungerLevel > 7) {
console.log('Time to eat!');
} else { 
 console.log('We can eat later!'); 
};

// and = && ; or = || ; not/bang = ! Bsp:

let stopLight = 'green';
let pedestrians = 0

if (stopLight === 'green' && pedestrians === 0) {
  console.log('Go!');
} else {
  console.log('Stop');
}
// oder:
let mood = "sleepy";
let tirednessLevel = 8;
if (mood!=="sleepy" || tirednessLevel>=8) {
  console.log('time to sleep')
} else {console.log('not bed time yet');
}

// falsy Variablen. Diese geben an, wenn ein Wert leer ist oder nicht existiert
    // 0; ""; ''; null; undefinied; NaN 

    let numberOfApples = 0;
 
if (numberOfApples){
   console.log('Let us eat apples!');
} else {
   console.log('No apples left!');

// Use short circuit evaluation to assign  writingUtensil variable below:
let defaultName;
if (username) {
  defaultName = username;
} else {
  defaultName = 'Stranger';
}
// kann abgeürzt werden als: mit || als ODER
let defaultName = username || 'Stranger';

// If abfragen abkürzen: 
let isNightTime = true;
 
if (isNightTime) {
  console.log('Turn on the lights!');
} else {
  console.log('Turn off the lights!');
}
// kann auch abgekürzt werden mit: "?" in Verbindung mit ":"
isNightTime ? console.log('Turn on the lights!') : console.log('Turn off the lights!');

// else if statement um mehrere Optionen offen zu halten! VORSICHT immer die Reihenfolge beachten!
let stopLight = 'yellow';
 
if (stopLight === 'red') {
  console.log('Stop!');
} else if (stopLight === 'yellow') {
  console.log('Slow down.');
} else if (stopLight === 'green') {
  console.log('Go!');
} else {
  console.log('Caution, unknown!');
}
// um nicht endlos oft else if statemnts schreiben zu müssen kann switch (...) genutzt werden!

let groceryItem = 'papaya';
 
switch (groceryItem) {
  case 'tomato':
    console.log('Tomatoes are $0.49');
    break;
  case 'lime':
    console.log('Limes are $1.49');
    break;
  case 'papaya':
    console.log('Papayas are $1.29');
    break;
  default:
    console.log('Invalid item');
    break;
} 
// statt:
let groceryItem = 'papaya';
 
if (groceryItem === 'tomato') {
  console.log('Tomatoes are $0.49');
} else if (groceryItem === 'papaya'){
  console.log('Papayas are $1.29');
} else {
  console.log('Invalid item');
}

// Funktionen verschachteln! 
function monitorCount(rows, columns) {
  return rows * columns;
}

function costOfMonitors(rows, columns) {
 return monitorCount(rows, columns) *200; // Funktion ruft monitorCount auf & setzt werte ein & multipliziert mit 200
}
const totalCost = costOfMonitors(5,4) //  5,& 4 werden als Values in Rows &  Columns eingesetzt; 
console.log(totalCost); //TotalCost wird "Rückwärts" durch einfügen der Funktionen berchnet und ausgegeben 

//Variablen eine Funktion zuweisen 

const plantNeedsWater = function (day) {
  if (day === 'Wednesday') {
    return true;
    }
    else { return false;
    }
  };
  plantNeedsWater('Tuesday') //Hier den aktuellen Tag checken. Wenn dieser NICHT Mittwoch ist, wird False ausgegeben!
  console.log(plantNeedsWater('Tuesday'))


  // kürzen 
  const plantNeedsWater = (day) => {
    return day === 'Wednesday' ? true : false;
  }; 
  // If durch ? & : ersetzen, Retrun ist bei Einzeiler automatisch 
  const plantNeedsWater = day =>  day === 'Wednesday' ? true : false;



  // Arrays sind Liste. Diese können mit [] bestimmt werden
  let seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
 
seasons[3] = 'Autumn'; // Liste bearbeitet 
console.log(seasons); 
//Output: ['Winter', 'Spring', 'Summer', 'Autumn']


// zählen, wie lange ein Array ist: .length nutzen!
const objectives = ['Learn a new languages', 'Read 52 books', 'Run a marathon'];
console.log(objectives.length)



//.push() allows us to add items to the end of an array.
const itemTracker = ['item 0', 'item 1', 'item 2'];
 
itemTracker.push('item 3', 'item 4');
 
console.log(itemTracker); 
// Output: ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'];



// .pop(), removes the last item of an array.
const newItemTracker = ['item 0', 'item 1', 'item 2'];
const removed = newItemTracker.pop();
console.log(newItemTracker); 
// Output: [ 'item 0', 'item 1' ]
console.log(removed);
// Output: item 2


// Arrays & Fuktionn verbinden
const concept = ['arrays', 'can', 'be', 'mutated'];

function changeArr(arr){
  arr[3] = 'MUTATED';
};
let removeElement = (newArr) =>  {newArr.pop()}

removeElement(concept);
console.log(concept)


// nested Arrays
const nestedArr = [[1], [2, 3]];
 
console.log(nestedArr[1]); // Output: [2, 3]
console.log(nestedArr[1][0]); // Output: 2
//bzw.
let numberClusters = [[1, 2],[3, 4], [5, 6]];
console.log(numberClusters) //[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]

const target = numberClusters[2][1]

console.log(target); // 6


// OBJECTS - An object literal with two key-value pairs // hier 2 Proporties: Fuel & Farbe
let spaceship = { //Objektname/ 
  'Fuel Type': 'diesel', //Key bzw. Identefier  : Value bzw. Property
  color: 'silver'
};

// der dot-Operator! Ruft durch den Key den Vaule eines Objektes auf! 
let spaceship = {
  homePlanet: 'Earth',
  color: 'silver'
};
spaceship.homePlanet; // Returns 'Earth',
spaceship.color; // Returns 'silver',

// auf [] Achten bei Aufrufen von Keys mit ''
let spaceship = {
  'Fuel Type': 'Turbo Fuel',
  'Active Duty': true,
  homePlanet: 'Earth',
  numCrew: 5
};
spaceship['Active Duty'];   // Returns true
spaceship['Fuel Type'];   // Returns  'Turbo Fuel'


// Objekte bearbeiten!
const spaceship = {type: 'shuttle'};
spaceship = {type: 'alien'}; // TypeError: Assignment to constant variable.
spaceship.type = 'alien'; // Changes the value of the type property
spaceship.speed = 'Mach 5'; // Creates a new key of 'speed' with a value of 'Mach 5'



// Objekte in Objekten ansprechen!
let spaceship = {
  passengers: {
    namesList: ['Simon', 'Karl', 'Sophia']
    },  
  telescope: {
    yearBuilt: 2018,
    model: "91031-XLT",
    focalLength: 2032 
  },
  crew: {
    captain: { 
      name: 'Sandra', 
      degree: 'Computer Engineering', 
      encourageTeam() { console.log('We got this!') },
     'favorite foods': ['cookies', 'cakes', 'candy', 'spinach'] }
  },
  
let capFave = spaceship.crew.captain['favorite foods'][0];
let firstPassenger = spaceship.passengers.namesList[0];
console.log(capFave) // [ 'cookies', 'cakes', 'candy', 'spinach' ]
console.log(firstPassenger) //Simon



// Looping Through Objects - Loops are programming tools that repeat a block of code until a condition is met.
let spaceship = {
  crew: {
  captain: { 
      name: 'Lily', 
      degree: 'Computer Engineering', 
      cheerTeam() { console.log('You got this!') } 
      },
  'chief officer': { 
      name: 'Dan', 
      degree: 'Aerospace Engineering', 
      agree() { console.log('I agree, captain!') } 
      },
  medic: { 
      name: 'Clementine', 
      degree: 'Physics', 
      announce() { console.log(`Jets on!`) } },
  translator: {
      name: 'Shauna', 
      degree: 'Conservation Science', 
      powerFuel() { console.log('The tank is full!') } 
      }
  }
}; 

// Jetzt LOOPEN!! 
for (let crewMember in spaceship.crew) {
console.log(`${crewMember}: ${spaceship.crew[crewMember].name}`)
}; // captain: Lily ;  chief officer: Dan ; medic: Clementine , translator: Shauna

for (let crewMember in spaceship.crew) {
console.log(`${spaceship.crew[crewMember].name}: ${spaceship.crew[crewMember].degree}`)
}; // Lily: Computer Engineering;  Dan: Aerospace Engineering;  Clementine: Physics;  Shauna: Conservation Science


// For loops!
for (let counter = 5; counter < 11; counter++) {
  console.log(counter);
} // 5 6 7 8 9 10 

//Loops Aufbau & AUfrufen 
const rapperArray = ["Lil' Kim", "Jay-Z", "Notorious B.I.G.", "Tupac"];

for (let i = 0; i < rapperArray.length; i++) {
  console.log(rapperArray[2]);
};
// es ist immer for (1. Wo fängt man an: let VARIABLE = STARTZAHL;2: Bedingungn, bis wann soll Aktion stattfinden: VARIABLE < OBJEKTANZAHL; 3. Wie soll weitergerechnet werden: Immer mit dem nächsten Wert: VARIABLE+1) {HIER Console.log() von dem, was man X mal ausgegeben bekommen will! Bestenfalls auch noch mit der genauen }

// Loop Log:
let groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];
for (let food = 0; food < 3; food++){console.log(groceryList[3]);
break;
} // brown rice