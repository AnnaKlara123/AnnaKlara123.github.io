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