// Namespace object
const weatherApp = {};

// API information
weatherApp.apiKey = `1903a471aab786101e6bcd6d7b0b6a07`;
weatherApp.apiKeyFiveDay = `8CQY9SE2V7QTVGV5WP895DAZ5`;

weatherApp.apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
weatherApp.apiUrlFiveDay = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast`;

// Variables to capture page elements
weatherApp.form = document.querySelector(`form`)
weatherApp.searchInput = document.getElementById(`search`);
weatherApp.resultsDiv = document.querySelector(`.results`);
weatherApp.displayIcon = document.querySelector(`.displayIcon`);
weatherApp.displayDescription = document.getElementsByClassName(`displayDescription`);
weatherApp.now = document.getElementById(`now`);
weatherApp.fiveDay = document.getElementById(`fiveDay`)
weatherApp.p = document.createElement(`p`);
weatherApp.forecastOl = document.querySelector(`ol`);
weatherApp.resultsChevron = document.querySelector(`a.mobileShow`);
weatherApp.modal = document.querySelector(`.modal`);

// Function to call the event listener
weatherApp.startEventListener = () => {
    // Hide empty forecastOl on page load
    weatherApp.forecastOl.style.display = 'none'
    weatherApp.form.addEventListener(`submit`, function (event) {
        // prevent page reload on form submissions
        event.preventDefault();
        // Clear contents of results
        weatherApp.p.textContent = ''
        weatherApp.displayIcon.textContent = ''
        weatherApp.forecastOl.textContent = ''
        weatherApp.resultsChevron.style.display = 'none'
       
        // Save user's search string in a variable
        weatherApp.userSearch = weatherApp.searchInput.value;
        // If user has selected Five Day forecast
        if (weatherApp.fiveDay.checked) {
            // Move resultsDiv to display forecast
            weatherApp.resultsDiv.style.left = '85%'
            weatherApp.resultsDiv.style.top = '0'
            weatherApp.resultsDiv.style.padding = '0'
            // Show Forecast ol
            weatherApp.forecastOl.style.display = 'grid'
            // Pass user query to forecast API
            weatherApp.getDataFive(weatherApp.userSearch);
        // If they selected current data
        } else {
            // Move resultsDiv to display one day
            weatherApp.resultsDiv.style.padding = '75px 0 60px';
            // Hide Forecast ol
            weatherApp.forecastOl.style.display = 'none'
            // Pass user query to current day API
            weatherApp.getDataOne(weatherApp.userSearch);
        }
    })
}

// Modal display error handling
weatherApp.modalErrorHandling = () => {
    weatherApp.modal.style.display = `block`;
    weatherApp.modal.innerHTML = `
        <p>Oops that doesn't look like a city name. Try again!</p>
        <button class="modalButton">Close</button>
        `;

    // Close modal window button
    const modalButton = document.querySelector(`.modalButton`);
    modalButton.addEventListener(`click`, function (modalEvent) {
        weatherApp.modal.style.visibility = `hidden`;
        window.location.reload();
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
                return response.json();
            } else { 
                throw new Error(response.statusText)
            }
        })
        .then((jsonResponse) => {
            weatherApp.displayTodaysData(jsonResponse);
        })
        .catch((error) => {
            // Modal error display
            if (error.message === `Not Found` || `Bad Request`) {
                weatherApp.modalErrorHandling();
            }
        })
}
        
// Function to calling Visual Crossing API for five days of weather data
weatherApp.getDataFive = (queryFive) => {
    const urlFiveDay = new URL(weatherApp.apiUrlFiveDay);

    urlFiveDay.search = new URLSearchParams({
        locations: `${queryFive}`,
        aggregateHours: 24,
        forecastDays: 5, /* returns 5-6 days */
        unitGroup: `metric`,
        shortColumnNames: false,
        contentType: `json`,
        key: weatherApp.apiKeyFiveDay
    })
    fetch(urlFiveDay)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if (jsonResponse.errorCode) {
                weatherApp.modalErrorHandling();
            } else {
                weatherApp.displayForecastData(jsonResponse)
            }
        })
}

// Function to display weather data on the page
weatherApp.displayTodaysData = (todaysDataFromApi) => {
    // Targeting the weather condition for icon
    const weatherConditionIcon = todaysDataFromApi.weather[0].icon;

    // Connecting corresponding weather icon to weather condition
    const weatherIconFunction = (iconID, imgAlt) => {
        if (weatherConditionIcon === iconID) {
            weatherApp.displayIcon.innerHTML = `
            <p class="displayDescription">${imgAlt}</p>
            <img src="http://openweathermap.org/img/wn/${iconID}@2x.png" alt="${imgAlt}">`;
        }
    }
    weatherIconFunction(`11d`, `Thunderstorm`);
    weatherIconFunction(`09d`, `Drizzle`);
    weatherIconFunction(`10d`, `Rainy day`);
    weatherIconFunction(`10n`, `Rainy night`);
    weatherIconFunction(`13d`, `Freezing rain or snow`);
    weatherIconFunction(`50d`, `Daytime fog or haze`);
    weatherIconFunction(`50n`, `Nighttime fog or haze`);
    weatherIconFunction(`01d`, `Clear day`);
    weatherIconFunction(`01n`, `Clear night`);
    weatherIconFunction(`02d`, `Cloudy day`);
    weatherIconFunction(`02n`, `Cloudy night`);
    weatherIconFunction(`03d`, `Daytime showers`);
    weatherIconFunction(`03n`, `Nighttime showers`);
    weatherIconFunction(`04d`, `Overcast day`);
    weatherIconFunction(`04n`, `Overcast night`)

    
    // Function to delay textContent in order to give API time to load img
    setTimeout(function() {
    // Math.round to present only a whole number
    weatherApp.p.textContent = `${Math.round(todaysDataFromApi.main.temp - 273.15)}° C`;
    }, 300);

    // Publish results to the page
    weatherApp.resultsDiv.appendChild(weatherApp.p);
    cleanUrl()
}

// Function to call Open Weather API for one day of weather data
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
        const monthConversion = (numReturnMonth, wordMonth) => {
            // Convert numerical month to spelled out month
            if (numMonth === numReturnMonth) {
                forecastDateHeader.textContent = `${wordMonth} ${day.datetimeStr.substring(8, 10)}`
            }
        }
        monthConversion(`01`, `Jan`);
        monthConversion(`02`, `Feb`);
        monthConversion(`03`, `Mar`);
        monthConversion(`04`, `Apr`);
        monthConversion(`05`, `May`);
        monthConversion(`06`, `June`);
        monthConversion(`07`, `July`);
        monthConversion(`08`, `Aug`);
        monthConversion(`09`, `Sept`);
        monthConversion(`10`, `Oct`);
        monthConversion(`11`, `Nov`);
        monthConversion(`12`, `Dec`);
      
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