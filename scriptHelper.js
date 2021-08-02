// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    let destination = document.getElementById("missionTarget");
    destination.innerHTML = `
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src=${imageUrl}>`;
}
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput) === false) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    //CHECK FUEL AND CARGO LEVELS
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus"); 
    let launchStatus = document.getElementById("launchStatus");
    
    if (fuelLevel < 10000 || cargoLevel > 10000) {
        list.style.visibility= "visible";
        launchStatus.style.color = "red";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch"; 
        if(fuelLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
        } else if (cargoLevel > 10000){
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        } 
    } else {
        list.style.visibility = "visible";
        launchStatus.style.color = "green"; 
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    } 
}

async function myFetch() {
    let planetsReturned;
    let url = "https://handlers.education.launchcode.org/static/planets.json";
    planetsReturned = await fetch(url).then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random()*(planets.length));
    let pickedPlanet = planets[randomPlanet];
    return pickedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
