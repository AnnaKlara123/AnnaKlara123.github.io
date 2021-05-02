// Functionen werden nur abgerufen, wenn sie gecalled werden!
function sayThanks() { //Var. Definieren
    console.log("Thank you for your purchase! We appreciate your business.");
  }
  sayThanks() //Call
  
// Reihenfolge ist wichtig!
function sayThanks(name) { // Funktion aufstellen
    console.log('Thank you for your purchase ' + name + '! We appreciate your business.');
  }
    sayThanks('Cole'); // den Namen als Argument bestimmen: "name" wird nur als Platzhalter genutzt!
    
    function greeting (name = 'stranger') {
        console.log(`Hello, ${name}!`)
      }
       
      greeting('Nick') // Output: Hello, Nick!
      greeting() // Output: Hello, stranger!