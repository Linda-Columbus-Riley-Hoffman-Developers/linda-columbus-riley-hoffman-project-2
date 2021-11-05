// Namespace object
const weatherApp = {};

// Relevant API information
weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

// Storing user input in a variable
weatherApp.userCityInput = `toronto`; //🚨 toronto as placeholder

// Request information from the API
weatherApp.getData = () => {
    const url = new URL(weatherApp.apiUrl);
    url.search = new URLSearchParams({
        q: `${weatherApp.userCityInput}`,
        appid: weatherApp.apiKey,
    })
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            weatherApp.displayTemperature(jsonResponse);
        })
}

// Function to display temperature on the page
weatherApp.displayTemperature = (objectDataFromApi) => {
    const resultsDiv = document.querySelector(`.results`);
    const p = document.createElement(`p`);
    p.textContent = objectDataFromApi.main.temp - 273.15;
    resultsDiv.appendChild(p);
}

weatherApp.init = () => {
    weatherApp.getData();
}

// Kickoff the app 🏈
weatherApp.init();


/* PSEUDO CODE

// App functionality thinking:
// Create a form with a search input to receive a city name
// Store the user's input as a variable
// Use the user's input to fetch from the API the corresponding temperature of that city
// Display the temperature on the page

// JS Thinking:
// Create an app object (weatherApp)
// Initialize preset data in the dedicated properties
// - apiURL
// - apiKey
// - userInputCity
// Create a method (getUserInputCity) to update the variable (userInputCity) based on user input

// Create a method (getCities) to make an API call, which takes the user input as a parameter (userInputCity)
// Identify/create a variable for an empty div where the results will be stored
// When the API call is successful, display the result by appending the data to the results div
// If the user text input doesn't exactly match a city property (eg. typo), there will be a prompt to ask them to try again

// Create an init method to kick off the setup of the application
*/