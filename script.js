// Namespace object
const weatherApp = {};

// Relevant API information
weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

// Variables to capture page elements
weatherApp.form = document.querySelector(`form`)
weatherApp.resultsDiv = document.querySelector(`.results`);
weatherApp.displayIcon = document.querySelector(`.displayIcon`);
weatherApp.p = document.createElement(`p`);
weatherApp.searchInput = document.querySelector(`input`)
weatherApp.sevenDay = document.getElementById(`sevenDay`)
weatherApp.now = document.getElementById(`now`)


// Request information from the API
weatherApp.getData = (query) => {
    const url = new URL(weatherApp.apiUrl);
    url.search = new URLSearchParams({
        q: `${query}`,
        appid: weatherApp.apiKey,
    })
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert(`Oops that doesn't look like a city name. Try again!`);
                    weatherApp.searchInput.value = ``;
                }
            })
            .then((jsonResponse) => {
                console.log(jsonResponse);
                weatherApp.displayWeatherData(jsonResponse);
            })
}

// Function to call the event listener
weatherApp.startEventListener = () => {
    weatherApp.form.addEventListener(`submit`, function (event) {
        // Store user's search input in a variable
        const userSearch = weatherApp.searchInput.value
        // prevent page reload on form submissions
        event.preventDefault();
        weatherApp.getData(userSearch);
    })
}


// Function to display weather data on the page
weatherApp.displayWeatherData = (objectDataFromApi) => {
    // Math.round to present only a whole number
    weatherApp.p.textContent = Math.round(objectDataFromApi.main.temp - 273.15);
    // Targeting the weather condition for icon
    const weatherCondition = objectDataFromApi.weather[0].main;
    // Connecting corresponding weather icon to weather condition
    if (weatherCondition === `Clouds`) {
        weatherApp.displayIcon.innerHTML = `<i class="fas fa-cloud"></i>`
    } else if (weatherCondition === `Clear`) {
        weatherApp.displayIcon.innerHTML = `<i class="fas fa-sun"></i>`
    }
    
    
    // Publish results to the page
    weatherApp.resultsDiv.appendChild(weatherApp.p);
}

weatherApp.init = () => {
    // Listen for Form Submission
    weatherApp.startEventListener()
    
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