$(document).ready(function () {
  const apikey = "f62e47f0db0b9b6b44b174b7fc572a81";
  const geminiApikey = "AIzaSyDgw3IN3PiEk1lFFIRTL6xZ0MjrPFZJLis";
  let globalWeatherData = null; // Global variable to store the weather data

  function get5DayForecastByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.city.name);
        globalWeatherData = data;
        return data;
      })
      .catch((error) => {
        console.error("Error fetching 5-day forecast:", error);
      });
  }

  function get5DayForecastByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        globalWeatherData = data;
        return data;
      })
      .catch((error) => {
        console.error("Error fetching 5-day forecast by coordinates:", error);
      });
  }

  function get5Day(data) {
    const cityName = data.city.name;

    const fiveDayForecast = [];
    data.list.forEach((forecast) => {
      if (forecast.dt_txt.includes("12:00:00")) {
        const dayWeather = {
          city: cityName,
          date: forecast.dt_txt.split(" ")[0],
          temp: forecast.main.temp,
          description: forecast.weather[0].description,
          icon: forecast.weather[0].icon,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed,
          pressure: forecast.main.pressure,
        };
        fiveDayForecast.push(dayWeather);
      }
    });
    return fiveDayForecast;
  }
  // Declare the table's body element
  const weatherTable = document
    .getElementById("weatherTable")
    .querySelector("tbody");

  // Function to add weather data to the table
  const addWeatherDataToTable = (date, temperature, weatherCondition) => {
    const row = document.createElement("tr");
    row.className =
      "border-b border-gray-700 bg-black hover:bg-gray-900 transition-colors duration-200"; // Darker background and hover effect

    row.innerHTML = `
      <td class="px-4 py-4 text-white">${date}</td> <!-- Increased padding -->
      <td class="px-4 py-4 font-bold text-white">${temperature}°C</td> <!-- Increased padding -->
      <td class="px-4 py-4 text-gray-300">${weatherCondition}</td> <!-- Increased padding -->
    `;

    // Append row to the table
    weatherTable.appendChild(row);
  };

  // Function to populate the weather data from the API response
  function populateWeatherBoxes(apiResponse) {
    // Iterate over the API response and add weather data to the table
    weatherTable.innerHTML = "";
    apiResponse.forEach((item) => {
      document.getElementById("city").textContent = item.city;
      console.log(item.city);

      const date = item.date;
      const temperature = (item.temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius
      const weatherCondition = item.description;

      // Call the function to add each data row to the table
      addWeatherDataToTable(date, temperature, weatherCondition);
    });
  }

  // function populateWeatherBoxes(apiResponse) {
  //   // const weatherBoxes = document.getElementById("weatherBoxes");

  //   // weatherBoxes.innerHTML = "";
  //   apiResponse.forEach((item) => {
  //     document.getElementById("city").textContent = item.city;
  //     console.log(item.city);
  //     const date = item.date;
  //     const temperature = (item.temp - 273.15).toFixed(0);
  //     const weatherCondition = item.description;
  //     addWeatherDataToTable(data, temperature, weatherCondition);
  //   });
  // }
  // const weatherTable = document
  //   .getElementById("weatherTable")
  //   .querySelector("tbody");
  // const addWeatherDataToTable = (date, temperature, weatherCondition) => {
  //   const row = document.createElement("tr");
  //   row.className = "border-b border-gray-300"; // Add border for rows

  //   row.innerHTML = `
  //     <td class="px-4 py-2 text-black">${date}</td>
  //     <td class="px-4 py-2 font-bold text-black">${temperature}°C</td>
  //     <td class="px-4 py-2 text-gray-600">${weatherCondition}</td>
  //   `;

  //   // Append row to the table
  //   weatherTable.appendChild(row);
  // };
  function getCurrentLocation5DaysWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          get5DayForecastByCoords(lat, lon)
            .then((weatherData) => {
              if (weatherData) {
                populateWeatherBoxes(get5Day(weatherData));
              }
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
            });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Event listener for city search button
  document.getElementById("cityInput-btn").addEventListener("click", () => {
    const search = document.getElementById("cityInput").value;
    get5DayForecastByCity(search)
      .then((weatherData) => {
        if (weatherData) {
          populateWeatherBoxes(get5Day(weatherData));
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  });
  document.getElementById("filterButton").addEventListener("click", () => {
    document.getElementById("filterOptions").classList.toggle("hidden");
  });

  document
    .getElementById("filterOptions")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const index = Array.from(event.target.parentNode.children).indexOf(
          event.target
        );
        document.getElementById("filterOptions").classList.toggle("hidden");

        switch (index) {
          case 0:
            showTemperaturesAscending();
            break;
          case 1:
            filterOutDaysWithoutRain();
            break;
          case 2:
            showDayWithHighestTemperature();
            break;
          case 3:
            showTemperaturesDescending();
            break;
          default:
            console.log("Unknown filter option selected.");
        }
      }
    });

  // Filter functions
  function showTemperaturesAscending() {
    if (globalWeatherData) {
      const sortedData = get5Day(globalWeatherData).sort(
        (a, b) => a.temp - b.temp
      );
      populateWeatherBoxes(sortedData);
    }
  }

  function showTemperaturesDescending() {
    if (globalWeatherData) {
      const sortedData = get5Day(globalWeatherData).sort(
        (a, b) => b.temp - a.temp
      );
      populateWeatherBoxes(sortedData);
    }
  }

  function filterOutDaysWithoutRain() {
    if (globalWeatherData) {
      const filteredData = get5Day(globalWeatherData).filter((item) =>
        item.description.toLowerCase().includes("rain")
      );
      populateWeatherBoxes(filteredData);
    }
  }

  function showDayWithHighestTemperature() {
    if (globalWeatherData) {
      const sortedData = get5Day(globalWeatherData).sort(
        (a, b) => b.temp - a.temp
      );
      populateWeatherBoxes([sortedData[0]]);
    }
  }
  document
    .getElementById("send-button")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      let apiPrompt = document.getElementById("user-input").value;
      const userMessage = document.createElement("div");
      userMessage.className = "text-right mb-2"; // Align user messages to the right
      userMessage.innerText = apiPrompt;
      document.getElementById("chat-box").appendChild(userMessage);

      if (apiPrompt.toLowerCase().includes("weather")) {
        const city = apiPrompt.split(" ").pop(); // Simple extraction of city name
        try {
          const globalWeatherData = await get5DayForecastByCity(city);

          // Ensure that globalWeatherData is valid
          if (globalWeatherData) {
            // Call get5Day with the globalWeatherData
            const apiData = get5Day(globalWeatherData);

            // Convert the weather data into a string format
            const resultString = apiData
              .map(
                (item) =>
                  `On ${item.date}, the temperature is ${item.temp}°K with ${item.description}.`
              )
              .join(" ");

            // Assign the resultString to apiPrompt
            apiPrompt = resultString + "Give a brief description about it ";
            console.log(apiPrompt);
          } else {
            console.error("No weather data received.");
            apiPrompt = "Sorry, I couldn't retrieve the weather data.";
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          apiPrompt = "Sorry, I couldn't retrieve the weather data.";
        }
      }

      // Clear input field
      document.getElementById("user-input").value = "";

      // Proceed with the fetch request only after apiPrompt has been set
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApikey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: apiPrompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        const botMessage = document.createElement("div");
        botMessage.className = "text-left mb-2"; // Align bot responses to the left
        botMessage.innerText = textResponse;
        document.getElementById("chat-box").appendChild(botMessage);

        // Scroll to the bottom of the chat
        const chatBox = document.getElementById("chat-box");
        chatBox.scrollTop = chatBox.scrollHeight;
      } catch (error) {
        document.getElementById("chat-box").innerText = "Error: " + error;
      }
    });

  // Show the pop-up window
  document.getElementById("userIcon").addEventListener("click", function () {
    document.getElementById("popup").classList.remove("hidden");
  });

  // Close the pop-up window
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").classList.add("hidden");
  });

  // Initial weather data fetch based on user's location
  getCurrentLocation5DaysWeather();
});
