
// Namespace object
const weatherApp = {};

// Relevant API information
weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
weatherApp.apiKeyFiveDay = `8CQY9SE2V7QTVGV5WP895DAZ5`;
weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
weatherApp.apiUrlFiveDay = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast`;

// Variables to capture page elements
weatherApp.form = document.querySelector(`form`)
weatherApp.resultsDiv = document.querySelector(`.results`);
weatherApp.displayIcon = document.querySelector(`.displayIcon`);
weatherApp.searchInput = document.getElementById(`search`);
weatherApp.fiveDay = document.getElementById(`fiveDay`)
weatherApp.now = document.getElementById(`now`)
weatherApp.p = document.createElement(`p`);
weatherApp.forecastOl = document.querySelector(`ol`);

// Function to call the event listener
weatherApp.startEventListener = () => {
    weatherApp.form.addEventListener(`submit`, function (event) {
        // prevent page reload on form submissions
        event.preventDefault();
        // Clear contents of results
        weatherApp.p.textContent = ''
        weatherApp.displayIcon.textContent = ''
        weatherApp.forecastOl.textContent = ''
       
        // Save user's search string in a variable
        weatherApp.userSearch = weatherApp.searchInput.value;
        // If user has selected Five Day forecast
        if (weatherApp.fiveDay.checked) {
            // Pass user query to forcast API
            weatherApp.getDataFive(weatherApp.userSearch);
        // If they have not selected Five Day Forecast
        } else {
            // Pass user query to current day API
            weatherApp.getDataOne(weatherApp.userSearch);
        }
    })
}

// Request information from the API
weatherApp.getDataOne = (queryOne) => {
    const url = new URL(weatherApp.apiUrl);
    url.search = new URLSearchParams({
        q: `${queryOne}`,
        appid: weatherApp.apiKey,
    })
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log(response, 'first .then')
                return response.json();
            } else {
                alert(`Oops that doesn't look like a city name. Try again!`);
                weatherApp.userSearch = ``;
            }
        })
        .then((jsonResponse) => {
            console.log(jsonResponse, 'second .then');
            weatherApp.displayTodaysData(jsonResponse);
        })
}

weatherApp.getDataFive = (queryFive) => {
    const urlFiveDay = new URL(weatherApp.apiUrlFiveDay);

    urlFiveDay.search = new URLSearchParams({
        locations: `${queryFive}`,
        aggregateHours: 24,
        forecastDays: 5,
        unitGroup: `metric`,
        shortColumnNames: false,
        contentType: `json`,
        key: weatherApp.apiKeyFiveDay
    })
    fetch(urlFiveDay)
        .then((response) => {
            if (response.ok) {
                console.log(response)
                return response.json();
            } else {
                alert(`Oops that doesn't look like a city name. Try again!`);
                weatherApp.userSearch = ``;
            }
        })
        .then((jsonResponse) => {
            console.log(jsonResponse, 'forecast');
            weatherApp.displayForecastData(jsonResponse);
        })
}

// Function to display weather data on the page
weatherApp.displayTodaysData = (todaysDataFromApi) => {
    // Math.round to present only a whole number
    weatherApp.p.textContent = `${Math.round(todaysDataFromApi.main.temp - 273.15)}° C`;
    // Targeting the weather condition for icon
    const weatherCondition = todaysDataFromApi.weather[0].main;
    console.log(weatherCondition)
    // Connecting corresponding weather icon to weather condition
    if (weatherCondition === `Clouds`) {
        weatherApp.displayIcon.innerHTML = '<i class="fas fa-cloud"></i>'
    } else if (weatherCondition === `Clear`) {
        weatherApp.displayIcon.innerHTML = '<i class="fas fa-sun"></i>'
    }

    // Publish results to the page
    weatherApp.resultsDiv.appendChild(weatherApp.p);
    cleanUrl()
}

// Function to display weather data on the page
weatherApp.displayForecastData = (forecastDataFromApi) => {
    // console.log(forecastDataFromApi.locations[weatherApp.userSearch].values)
    forecastDataFromApi['locations'][weatherApp.userSearch]['values'].forEach((day) => {
        // create li element
        const li = document.createElement(`li`);
        // create a p element
        const forecastP = document.createElement(`p`);
        console.log(day)
        // Capture data from API to publish
        forecastP.textContent = `${Math.round(day['temp'])}° C`
        li.appendChild(forecastP);
        weatherApp.forecastOl.appendChild(li)
        cleanUrl()
    })
}

// Remove #main from url if links to #main (skip to, header arrow) are clicked
function cleanUrl () {
history.pushState("", document.title, window.location.pathname + window.location.search);
}

weatherApp.init = () => {
    // Listen for Form Submission
    weatherApp.startEventListener()
    cleanUrl()

}

// Kickoff the app 🏈
weatherApp.init();


// var scrollV, scrollH, loc = window.location;
// if ("pushState" in history)
//     history.pushState("", document.title, loc.pathname + loc.search);
// else {
//     // Prevent scrolling by storing the page's current scroll offset
//     scrollV = document.body.scrollTop;
//     scrollH = document.body.scrollLeft;

//     loc.hash = "";

//     // Restore the scroll offset, should be flicker free
//     document.body.scrollTop = scrollV;
//     document.body.scrollLeft = scrollH;

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




//     } else if (weatherApp.now.checked) {
//         url.search = new URLSearchParams({
//             q: `${query}`,
//             appid: weatherApp.apiKey
//         })
//     }
//         fetch(url)
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     alert(`Oops that doesn't look like a city name. Try again!`);
//                     weatherApp.userSearch = ``;
//                 }
//             })
//             .then((jsonResponse) => {
//                 console.log(jsonResponse);
//                 weatherApp.displayWeatherData(jsonResponse);
//             })
// }