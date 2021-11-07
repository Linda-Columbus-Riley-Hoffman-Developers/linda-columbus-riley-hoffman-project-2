// // Namespace object
// const weatherApp = {};

// // Relevant API information
// weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
// weatherApp.apiKeySevenDay = `8CQY9SE2V7QTVGV5WP895DAZ5`;
// weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
// weatherApp.apiUrlSevenDay = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast`;

// // Variables to capture page elements
// weatherApp.form = document.querySelector(`form`)
// weatherApp.resultsDiv = document.querySelector(`.results`);
// weatherApp.displayIcon = document.querySelector(`.displayIcon`);
// weatherApp.p = document.createElement(`p`);
// weatherApp.searchInput = document.getElementById(`search`);
// weatherApp.userSearch = weatherApp.searchInput.value; // Store user's search input in a variable
// weatherApp.sevenDay = document.getElementById(`fiveDay`)
// weatherApp.now = document.getElementById(`now`)


// // Request information from the API
// weatherApp.getDataOne = (queryOne) => {
//     const url = new URL(weatherApp.apiUrl);
//     url.search = new URLSearchParams({
//         q: `${queryOne}`,
//         appid: weatherApp.apiKey,
//     })
//     fetch(url)
//         .then((response) => {
//             if (response.ok) {
//                 console.log(response, 'first .then')
//                 return response.json();
//             } else {
//                 alert(`Oops that doesn't look like a city name. Try again!`);
//                 weatherApp.userSearch = ``;
//             }
//         })
//         .then((jsonResponse) => {
//             console.log(jsonResponse, 'second .then');
//             weatherApp.displayTodaysData(jsonResponse);
//         })
// }

// weatherApp.getDataFive = (queryFive) => {
//     const urlSevenDay = new URL(weatherApp.apiUrlSevenDay);

//     urlSevenDay.search = new URLSearchParams({
//         locations: `${queryFive}`,
//         aggregateHours: 24,
//         forecastDays: 5,
//         unitGroup: `metric`,
//         shortColumnNames: false,
//         contentType: `json`,
//         key: weatherApp.apiKeySevenDay
//     })
//     fetch(urlSevenDay)
//         .then((response) => {
//             if (response.ok) {
//                 console.log(response)
//                 return response.json();
//             } else {
//                 alert(`Oops that doesn't look like a city name. Try again!`);
//                 weatherApp.userSearch = ``;
//             }
//         })
//         .then((jsonResponse) => {
//             console.log(jsonResponse);
//             weatherApp.displayForecastData(jsonResponse);
//         })
// }



// // Function to call the event listener
// weatherApp.startEventListener = () => {
//     weatherApp.form.addEventListener(`submit`, function (event) {
//         // prevent page reload on form submissions
//         event.preventDefault();
//         // If Seven Day Forcast 
//         if (weatherApp.sevenDay.checked) {
//             weatherApp.getDataFive(weatherApp.userSearch);
//         } else {
//             weatherApp.getDataOne(weatherApp.userSearch);
//         }
//     })
// }

// // Function to display weather data on the page
// weatherApp.displayTodaysData = (todaysDataFromApi) => {
//     // Math.round to present only a whole number
//     weatherApp.p.textContent = `${Math.round(todaysDataFromApi.main.temp - 273.15)}° C`;
//     // Targeting the weather condition for icon
//     const weatherCondition = todaysDataFromApi.weather[0].main;
//     // Connecting corresponding weather icon to weather condition
//     if (weatherCondition === `Clouds`) {
//         weatherApp.displayIcon.innerHTML = `<i class="fas fa-cloud"></i>`
//     } else if (weatherCondition === `Clear`) {
//         weatherApp.displayIcon.innerHTML = `<i class="fas fa-sun"></i>`
//     }

//     // Publish results to the page
//     weatherApp.resultsDiv.appendChild(weatherApp.p);
// }

// // Function to display weather data on the page
// weatherApp.displayForecastData = (forecastDataFromApi) => {
//     // Math.round to present only a whole number
//     weatherApp.p.textContent = `It Worked!`;
//     // Capture data from API to publish 

//     // // Publish results to the page
//     weatherApp.resultsDiv.appendChild(weatherApp.p);
// }

// weatherApp.init = () => {
//     // Listen for Form Submission
//     weatherApp.startEventListener()

// }

// // Kickoff the app 🏈
// weatherApp.init();


// /* PSEUDO CODE
// // App functionality thinking:
// // Create a form with a search input to receive a city name
// // Store the user's input as a variable
// // Use the user's input to fetch from the API the corresponding temperature of that city
// // Display the temperature on the page
// // JS Thinking:
// // Create an app object (weatherApp)
// // Initialize preset data in the dedicated properties
// // - apiURL
// // - apiKey
// // - userInputCity
// // Create a method (getUserInputCity) to update the variable (userInputCity) based on user input
// // Create a method (getCities) to make an API call, which takes the user input as a parameter (userInputCity)
// // Identify/create a variable for an empty div where the results will be stored
// // When the API call is successful, display the result by appending the data to the results div
// // If the user text input doesn't exactly match a city property (eg. typo), there will be a prompt to ask them to try again
// // Create an init method to kick off the setup of the application
// */




// //     } else if (weatherApp.now.checked) {
// //         url.search = new URLSearchParams({
// //             q: `${query}`,
// //             appid: weatherApp.apiKey
// //         })
// //     }
// //         fetch(url)
// //             .then((response) => {
// //                 if (response.ok) {
// //                     return response.json();
// //                 } else {
// //                     alert(`Oops that doesn't look like a city name. Try again!`);
// //                     weatherApp.userSearch = ``;
// //                 }
// //             })
// //             .then((jsonResponse) => {
// //                 console.log(jsonResponse);
// //                 weatherApp.displayWeatherData(jsonResponse);
// //             })
// // }



// Namespace object
const weatherApp = {};

// Relevant API information
weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
weatherApp.apiKeySevenDay = `8CQY9SE2V7QTVGV5WP895DAZ5`;
weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
weatherApp.apiUrlSevenDay = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast`;

// Variables to capture page elements
weatherApp.form = document.querySelector(`form`)
weatherApp.resultsDiv = document.querySelector(`.results`);
weatherApp.displayIcon = document.querySelector(`.displayIcon`);
weatherApp.p = document.createElement(`p`);
weatherApp.searchInput = document.getElementById(`search`);
weatherApp.userSearch = weatherApp.searchInput.value; // Store user's search input in a variable
weatherApp.sevenDay = document.getElementById(`sevenDay`)
weatherApp.now = document.getElementById(`now`)


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
    const urlSevenDay = new URL(weatherApp.apiUrlSevenDay);

    urlSevenDay.search = new URLSearchParams({
        locations: `${queryFive}`,
        aggregateHours: 24,
        forecastDays: 5,
        unitGroup: `metric`,
        shortColumnNames: false,
        contentType: `json`,
        key: weatherApp.apiKeySevenDay
    })
    fetch(urlSevenDay)
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
            console.log(jsonResponse);
            weatherApp.displayForecastData(jsonResponse);
        })
}



// Function to call the event listener
weatherApp.startEventListener = () => {
    weatherApp.form.addEventListener(`submit`, function (event) {
        // prevent page reload on form submissions
        event.preventDefault();
        if (weatherApp.sevenDay.checked) {
            weatherApp.getDataFive(weatherApp.userSearch);
        } else {
            weatherApp.getDataOne(weatherApp.userSearch);
        }
    })
}

// Function to display weather data on the page
weatherApp.displayTodaysData = (todaysDataFromApi) => {
    // Math.round to present only a whole number
    weatherApp.p.textContent = `${Math.round(todaysDataFromApi.main.temp - 273.15)}° C`;
    // Targeting the weather condition for icon
    const weatherCondition = todaysDataFromApi.weather[0].main;
    // Connecting corresponding weather icon to weather condition
    if (weatherCondition === `Clouds`) {
        weatherApp.displayIcon.innerHTML = `<i class="fas fa-cloud"></i>`
    } else if (weatherCondition === `Clear`) {
        weatherApp.displayIcon.innerHTML = `<i class="fas fa-sun"></i>`
    }

    // Publish results to the page
    weatherApp.resultsDiv.appendChild(weatherApp.p);
}

// Function to display weather data on the page
weatherApp.displayForecastData = (forecastDataFromApi) => {
    // Math.round to present only a whole number
    weatherApp.p.textContent = `It Worked!`;
    // Capture data from API to publish 

    // // Publish results to the page
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