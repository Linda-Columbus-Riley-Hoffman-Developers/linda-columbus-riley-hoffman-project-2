
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
            // Move resultsDiv to display forecast
            weatherApp.resultsDiv.style.left = '85%'
            weatherApp.resultsDiv.style.top = '0'
            // Pass user query to forecast API
            weatherApp.getDataFive(weatherApp.userSearch);
            // Display dates
            weatherApp.date
        // If they have not selected Five Day Forecast
        } else {
            // Move resultsDiv to display one day
            weatherApp.resultsDiv.style.left = '90%'
            weatherApp.resultsDiv.style.top = '37%'
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
                return response.json();
            } else {
                alert(`Oops that doesn't look like a city name. Try again!`);
                weatherApp.userSearch = ``;
            }
        })
        .then((jsonResponse) => {
            weatherApp.displayForecastData(jsonResponse);
        })
}

// Function to display weather data on the page
weatherApp.displayTodaysData = (todaysDataFromApi) => {
    // Math.round to present only a whole number
    weatherApp.p.textContent = `${Math.round(todaysDataFromApi.main.temp - 273.15)}° C`;
    // Targeting the weather condition for icon
    const weatherCondition = todaysDataFromApi.weather[0].main;
    const weatherConditionIcon = todaysDataFromApi.weather[0].icon;
    // Connecting corresponding weather icon to weather condition

    
    const weatherIcon = document.createElement(`img`)

    if (weatherConditionIcon === `11d`) {
        weatherApp.resultsDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/11d@2x.png" alt="Thunderstorm">`
    } else if (weatherConditionIcon === `09d`) {
        weatherApp.resultsDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/09d@2x.png" alt="Drizzle">`
    } else if (weatherConditionIcon === `04d`) {
        weatherApp.resultsDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/04d@2x.png">`
    } else if (weatherConditionIcon === `01n`) {
        weatherApp.displayIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/01n@2x.png">`
    }





    // if (weatherCondition === `Clouds`) {
    //     weatherApp.displayIcon.innerHTML = '<i class="fas fa-cloud"></i>'
    // } else if (weatherCondition === `Clear`) {
    //     weatherApp.displayIcon.innerHTML = '<i class="fas fa-sun"></i>'
    // }

    // Publish results to the page
    weatherApp.resultsDiv.appendChild(weatherApp.p);
    cleanUrl()
}

// Function to display weather data on the page
weatherApp.displayForecastData = (forecastDataFromApi) => {
    const values = forecastDataFromApi.locations[weatherApp.userSearch].values;
    values.forEach((day) => {
        // create li element
        const li = document.createElement(`li`);
        // create a h3 & p element to hold data
        const forecastP = document.createElement(`p`);
        const forecastDateHeader = document.createElement(`h3`);
        const numMonth = `${day.datetimeStr.substring(5, 7)}`;

        // Capture dates and temperature data from API to publish
        // forecastDateHeader.textContent = `${day.datetimeStr.substring(5, 10)}`;
        // console.log(day.datetimeStr.substring(5, 7))
        if (numMonth === `11`) {
            forecastDateHeader.textContent = `Nov ` + `${day.datetimeStr.substring(8, 10)}`
        }


        forecastP.textContent = `${Math.round(day.temp)}° C`

        // Append data to created elements
        li.appendChild(forecastDateHeader);
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

// Variable to hold today's date
// weatherApp.today = new Date();
// weatherApp.tomorrow = new Date();
// weatherApp.dayOfMonth = weatherApp.today.getDate()
// console.log(weatherApp.dayOfMonth)

    /*
    // Display forecast dates, using loop
    // Create an empty array to store the returned weatherApp.date looped strings
    const forecastDates = []

    // Loop to obtain today + future 4 calendar dates for forecast
    for (let i = weatherApp.dayOfMonth; i <= weatherApp.dayOfMonth + 4; i++) {
        weatherApp.tomorrow.setDate(i);

        weatherApp.date = (weatherApp.tomorrow.getMonth() + 1) + '-' + weatherApp.tomorrow.getDate();

        // Convert the strings into array properties
        forecastDates.push(weatherApp.date)
        }

    // forEach to append calendar dates to previously created <li> in values.forEach()
    forecastDates.forEach((date) => {
        const dateP = document.createElement(`p`);
        // console.log(dateP, `this is dateP`)
        dateP.innerText = date;
        // console.log(date, `this is date`)
        // const forecastLI = document.querySelector(`li:last-child`);
        // forecastLI.appendChild(dateP)
    })
    
        console.log(forecastDates)
        */