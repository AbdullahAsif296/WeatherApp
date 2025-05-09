$(document).ready(function () {
  const apikey = "f62e47f0db0b9b6b44b174b7fc572a81";
  let lastSearchedCity = "";
  function formatDateTime(unixTimestamp) {
    // Create a Date object based on the Unix timestamp in milliseconds (JavaScript uses milliseconds)
    const date = new Date(unixTimestamp * 1000); // No need to add timezoneOffset

    // Format the date and time in the local timezone
    const formattedDate = date.toLocaleDateString(); // Local date format
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Local time format

    return `${formattedTime}  ${formattedDate}`;
  }
  function clearWeatherElements() {
    const weatherElements = document.querySelectorAll(
      ".sky, .sun, .cloud, .moon, .stars"
    );
    if (weatherElements.length > 0) {
      weatherElements.forEach((element) => {
        if (element) {
          console.log(element);
          // Check if the element exists
          element.remove();
        }
      });
    } else {
      console.log("No weather elements to remove.");
    }
  }
  function displayErrorMessage() {
    clearWeatherElements();
    // Hide the weather data container if it exists
    const weatherDataElement = document.querySelector(".weather-data");
    if (weatherDataElement) {
      weatherDataElement.style.display = "none";
    }

    // Check if an error container already exists, if so, remove it first to avoid duplicates
    const errorContainer = document.querySelector(".error");

    errorContainer.style.display = "block";
  }

  function displayWeather(data) {
    const weatherDataElement = document.querySelector(".weather-data");
    if (weatherDataElement) {
      weatherDataElement.style.display = "block";
    }
    const errorContainer = document.querySelector(".error");

    errorContainer.style.display = "none";
    // Extract the required values from the API response

    const visibility = data.visibility;
    const feelLike = data.main.feels_like;
    const pressure = data.main.pressure;
    const city = data.name;
    const temperature = data.main.temp;
    const weather = data.weather[0].main;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Extracting current time, sunrise, and sunset

    const currentTime = formatDateTime(data.dt);
    // Set the values to HTML elements
    document.getElementById("city").textContent = city;
    document.getElementById("temperature").innerText = `${kelvinToCelsius(
      temperature
    )} °C`;
    document.getElementById("weather").textContent = weather;
    document.getElementById(
      "description"
    ).textContent = `Description : ${description}`;
    document.getElementById("humidity").textContent = `${humidity} %`;
    document.getElementById("windSpeed").textContent = `${windSpeed} m/s`;
    document.getElementById("visibility").textContent = `${visibility} m`;
    document.getElementById(
      "feels-like"
    ).textContent = `feels like ${kelvinToCelsius(feelLike)} °C`;
    document.getElementById("pressure").textContent = `${pressure} hPa`;
    document.getElementById("time").textContent = currentTime;

    const iconCode = data.weather[0].icon;
    const bodyElement = document.querySelector("body");

    if (iconCode.includes("n")) {
      bodyElement.style.color = "white"; // Set text color to white for 'n'
    } else if (iconCode.includes("d")) {
      bodyElement.style.color = "black"; // Set text color to black for 'd'
    }
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
    fetchWeatherAndGenerateCharts(city);
    console.log(iconCode);
    switch (iconCode) {
      case "01d": // Clear Day
        clearWeatherElements();
        const sky = document.createElement("div");
        sky.classList.add("sky");
        document.body.appendChild(sky);

        // Create the sun element
        const sun = document.createElement("div");
        sun.classList.add("sun");
        sun.style.display = "block"; // Show the sun
        document.body.appendChild(sun);
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "back");
        svg.setAttribute("viewBox", "0 0 400 400");

        // Define the radial gradient
        var defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        var radialGradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "radialGradient"
        );
        radialGradient.setAttribute("id", "SVGID_1_");
        radialGradient.setAttribute("cx", "0");
        radialGradient.setAttribute("cy", "0");
        radialGradient.setAttribute("r", "320.8304");
        radialGradient.setAttribute("gradientUnits", "userSpaceOnUse");

        var stop1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop1.setAttribute("offset", "0");
        stop1.setAttribute("style", "stop-color: #ffde17; stop-opacity: 0.7");

        var stop2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop2.setAttribute("offset", "1");
        stop2.setAttribute("style", "stop-color: #fff200; stop-opacity: 0");

        // Append stops to gradient and gradient to defs
        radialGradient.appendChild(stop1);
        radialGradient.appendChild(stop2);
        defs.appendChild(radialGradient);
        svg.appendChild(defs);

        // Create the sunburst group
        var sunburstGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        sunburstGroup.setAttribute("id", "sunburst-group");
        sunburstGroup.setAttribute(
          "transform",
          "translate(200, 26) scale(0.43)"
        );
        var path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("id", "sunburst");
        path.setAttribute(
          "style",
          "fill: url(#SVGID_1_); transform-origin: 0 0"
        );
        path.setAttribute(
          "d",
          "M0,319.7c-18.6,0-37.3-1.6-55.5-4.8L-7.8,41.4c5.1,0.9,10.6,0.9,15.7,0L56,314.8C37.6,318,18.8,319.7,0,319.7z M-160.8,276.6c-32.5-18.8-61.3-42.9-85.5-71.6L-34,26.2c3.4,4.1,7.4,7.4,12,10.1L-160.8,276.6z M161.3,276.4L22.1,36.2c4.5-2.6,8.6-6,12-10.1l212.6,178.5C222.5,233.4,193.8,257.6,161.3,276.4z M-302.5,108.3C-315.4,73-321.9,36-322-1.8l277.6-0.5c0,5.3,0.9,10.4,2.7,15.2L-302.5,108.3z M302.6,107.8L41.8,12.8c1.7-4.7,2.6-9.7,2.6-14.9c0-0.3,0-0.6,0-1H322l0-1.3l0,1.9 C322,35.4,315.5,72.5,302.6,107.8z M-41.8-17.5l-261-94.5c12.8-35.4,31.6-68,55.8-96.9L-34.1-30.8C-37.5-26.8-40.1-22.3-41.8-17.5z M41.7-17.7c-1.8-4.8-4.4-9.3-7.8-13.3l212-179.2c24.3,28.8,43.3,61.3,56.3,96.6L41.7-17.7z M-22.2-40.8l-139.6-240c32.7-19,68.1-32,105.2-38.6L-8-46.1C-13-45.2-17.8-43.4-22.2-40.8z M22-40.9c-4.4-2.6-9.2-4.3-14.2-5.1l47.1-273.6c37.2,6.4,72.7,19.2,105.4,38L22-40.9z"
        );

        // Append the path to the sunburst group
        sunburstGroup.appendChild(path);
        svg.appendChild(sunburstGroup);

        // Append the SVG to the sky
        document.querySelector(".sky").appendChild(svg);

        // Animate the sunburst group
        gsap.to(sunburstGroup, {
          rotation: 360,
          transformOrigin: "50% 50%", // Center of the sunburst group
          repeat: -1,
          duration: 20,
          ease: "none",
        });
        // Create cloud 1

        // Apply sunny class for animation
        sky.classList.add("sunny");

        break;
      case "01n":
        clearWeatherElements();
        const weatherData = document.querySelector("body");

        // Add 'night' class to change the background
        weatherData.classList.add("night");

        // Create moon element
        const moon = document.createElement("div");
        moon.classList.add("moon");
        moon.style.display = "block";
        // Create stars container
        const stars = document.createElement("div");
        stars.classList.add("stars");
        stars.style.display = "block";

        // Create stars and append them to stars container
        for (let i = 1; i <= 11; i++) {
          const star = document.createElement("div");
          star.classList.add("star");
          stars.appendChild(star);
        }

        // Append moon and stars to the weather data container
        weatherData.appendChild(moon);
        weatherData.appendChild(stars);

        // Add custom star positions (for scattered effect)
        const starElements = stars.children;
        // Assuming the moon's position is roughly centered on the screen

        // Adjusting star positions further away from the moon
        starElements[0].style.top = "5%"; // Move closer to the top
        starElements[0].style.left = "20%"; // Move further left
        starElements[1].style.top = "10%"; // Move closer to the top
        starElements[1].style.left = "80%"; // Move further right
        starElements[2].style.top = "35%"; // Move slightly down
        starElements[2].style.left = "85%"; // Move further right
        starElements[3].style.top = "50%"; // Center vertically
        starElements[3].style.left = "30%"; // Move further left
        starElements[4].style.top = "2%"; // Move closer to the top
        starElements[4].style.left = "45%"; // Adjust horizontally
        starElements[5].style.top = "15%"; // Move slightly down
        starElements[5].style.left = "30%"; // Move further left
        starElements[6].style.top = "40%"; // Move slightly down
        starElements[6].style.left = "75%"; // Adjust horizontally
        starElements[7].style.top = "25%"; // Move slightly down
        starElements[7].style.left = "90%"; // Move further right
        starElements[8].style.top = "70%"; // Move slightly down
        starElements[8].style.left = "20%"; // Move further left
        starElements[9].style.top = "10%"; // Move closer to the top
        starElements[9].style.left = "60%"; // Adjust horizontally

        break;

      case "02d": // Fewer Clouds Day
        clearWeatherElements();

        const sky1 = document.createElement("div");
        sky1.classList.add("sky");
        sky1.classList.add("sunny");

        document.body.appendChild(sky1);
        if (sky1) {
          console.log(sky1);
        }
        // Create the sun element
        const sun1 = document.createElement("div");
        sun1.classList.add("sun");
        sun1.style.display = "block"; // Show the sun

        document.body.appendChild(sun1);
        const cloud1 = document.createElement("div");
        cloud1.classList.add("cloud", "cloud1");
        cloud1.style.width = "200px";
        cloud1.style.height = "100px";
        cloud1.style.position = "absolute"; // Add position to style
        cloud1.style.top = "150px";
        cloud1.style.left = "50px";
        document.body.appendChild(cloud1);

        // Create cloud 2
        const cloud2 = document.createElement("div");
        cloud2.classList.add("cloud", "cloud2");
        cloud2.style.width = "150px";
        cloud2.style.height = "80px";
        cloud2.style.position = "absolute"; // Add position to style
        cloud2.style.top = "200px";
        cloud2.style.left = "200px";
        document.body.appendChild(cloud2);
        // You can set cloud display logic or other conditions
        document.querySelectorAll(".cloud").forEach((cloud) => {
          console.log(1);
          cloud.style.display = "block";
        });
        break;

      case "02n": // Fewer Clouds Night
        clearWeatherElements();
        const weatherData2n = document.querySelector("body");

        // Add 'night' class to change the background
        weatherData2n.classList.add("night");

        // Create moon element
        const moon2n = document.createElement("div");
        moon2n.classList.add("moon");
        moon2n.style.display = "block";
        weatherData2n.appendChild(moon2n);
        const cloud12n = document.createElement("div");
        cloud12n.classList.add("cloud", "cloud1");
        cloud12n.style.width = "200px";
        cloud12n.style.height = "100px";
        cloud12n.style.position = "absolute"; // Add position to style
        cloud12n.style.top = "150px";
        cloud12n.style.left = "50px";
        document.body.appendChild(cloud12n);

        // Create cloud 2
        const cloud22n = document.createElement("div");
        cloud22n.classList.add("cloud", "cloud2");
        cloud22n.style.width = "150px";
        cloud22n.style.height = "80px";
        cloud22n.style.position = "absolute"; // Add position to style
        cloud22n.style.top = "200px";
        cloud22n.style.left = "200px";
        document.body.appendChild(cloud22n);
        // You can set cloud display logic or other conditions
        document.querySelectorAll(".cloud").forEach((cloud) => {
          console.log(1);
          cloud.style.display = "block";
        });
        break;

      case "03d": //Scattered Clouds Day
        clearWeatherElements();

        // Create the sky element
        const scatteredSky = document.createElement("div");
        scatteredSky.classList.add("sky");
        scatteredSky.classList.add("sunny");

        document.body.appendChild(scatteredSky);

        // Create the sun element for daytime scattered clouds
        const scatteredSun = document.createElement("div");
        scatteredSun.classList.add("sun");
        document.body.appendChild(scatteredSun);
        scatteredSun.style.display = "block";
        // Create multiple scattered cloud elements
        for (let i = 1; i <= 5; i++) {
          const cloud = document.createElement("div");
          cloud.classList.add("cloud", `cloud${i}`);
          document.body.appendChild(cloud);
          cloud.style.display = "block";
        }

        break;
      case "03n":
        iconFile = "03n.png"; // Scattered Clouds Night
        break;
      case "04d":
        iconFile = "04d.png"; // Broken Clouds Day
        break;
      case "04n":
        iconFile = "04n.png"; // Broken Clouds Night
        break;
      case "09d":
        // Set the body background color
        document.body.style.backgroundColor = "#d8d8d8"; // Light gray background

        // Create clouds
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        cloud.style.display = "block";
        document.body.appendChild(cloud);

        // Create rain drops
        for (let i = 0; i < 100; i++) {
          // Create 100 raindrops for better effect
          const rainDrop = document.createElement("div");
          rainDrop.className = "rain";

          // Random horizontal position
          rainDrop.style.left = Math.random() * 100 + "vw";

          // Random falling speed
          rainDrop.style.animationDuration = Math.random() * 0.5 + 0.5 + "s";

          // Avoid the area where the cloud is positioned
          // Assuming cloud is around top 120px
          const cloudTopPosition = 120; // Adjust based on your cloud height
          rainDrop.style.top =
            Math.random() * (window.innerHeight - cloudTopPosition) +
            cloudTopPosition +
            "px"; // Ensure raindrops start below the clouds

          document.body.appendChild(rainDrop);
        }

        break;
      case "09n":
        iconFile = "09n.png"; // Shower Rain Night
        break;
      case "10d":
        iconFile = "10d.png"; // Rain Day
        break;
      case "10n":
        iconFile = "10n.png"; // Rain Night
        break;
      case "11d":
        iconFile = "11d.png"; // Thunderstorm Day
        break;
      case "11n":
        iconFile = "11n.png"; // Thunderstorm Night
        break;
      case "13d":
        iconFile = "13d.png"; // Snow Day
        break;
      case "13n":
        iconFile = "13n.png"; // Snow Night
        break;
      case "50d":
        iconFile = "50d.png"; // Mist Day
        break;
      case "50n":
        iconFile = "50n.png"; // Mist Night
        break;
      default:
        iconFile = ""; // Default if none selected
    }
  }
  let isCelsius = true;
  function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
  }

  // Function to convert Kelvin to Fahrenheit
  function kelvinToFahrenheit(kelvin) {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(0);
  }

  // Function to toggle between Celsius and Fahrenheit
  function handleToggleChange() {
    const tempElement = document.getElementById("temperature");
    const tempKelvin = weatherDataGlobal.main.temp;

    if (isCelsius) {
      tempElement.innerText = `${kelvinToFahrenheit(tempKelvin)} °F`;
    } else {
      tempElement.innerText = `${kelvinToCelsius(tempKelvin)} °C`;
    }
    isCelsius = !isCelsius;
  }

  // Function to fetch current weather data using city name
  // Define a global variable to store weather data
  let weatherDataGlobal = null;

  async function getCurrentWeatherByCity(city) {
    lastSearchedCity = city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
      const response = await fetch(apiUrl);

      if (response.status === 404) {
        // City not found, display error message
        hideLoading();
        displayErrorMessage();
        return;
      }

      const data = await response.json();
      hideLoading();
      console.log("Current Weather:", data);

      // Assign the weather data to the global variable
      weatherDataGlobal = data;

      // If the city is found, display the weather data
      displayWeather(data);
      return data;
    } catch (error) {
      console.error("Error fetching current weather data:", error);
    }
  }

  // Function to fetch current weather data using coordinates (latitude & longitude)
  async function getCurrentWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Current Weather by Coordinates:", data);
      hideLoading();
      // Assign the weather data to the global variable
      weatherDataGlobal = data;

      return data; // Return the weather data
    } catch (error) {
      console.error(
        "Error fetching current weather data by coordinates:",
        error
      );
    }
  }

  // Function to fetch 5-day weather forecast using city name

  document.getElementById("cityInput-btn").addEventListener("click", () => {
    const search = document.getElementById("cityInput").value; // Use .value for input fields
    if (lastSearchedCity !== search) {
      showLoading();
      getCurrentWeatherByCity(search);
      console.log("Button clicked!");
    }
    document.getElementById("cityInput").value = "";
  });
  document
    .getElementById("temp-toggle")
    .addEventListener("change", handleToggleChange);

  let barChart, doughnutChart, lineChart; // Variables to hold chart instances

  function fetchWeatherAndGenerateCharts(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    // Fetch the weather data from the API
    fetch(apiURL)
      .then((response) => response.json())
      .then((apiResponse) => {
        // Create labels for days
        const days = Array.from({ length: 5 }, (_, i) => `Day ${i + 1}`); // ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]

        // Convert temperatures from Kelvin to Celsius
        const temperatures = apiResponse.list
          .slice(0, 5)
          .map((day) => day.main.temp - 273.15);
        const weatherConditions = apiResponse.list
          .slice(0, 5)
          .map((day) => day.weather[0].main);

        // Count weather conditions
        const weatherCount = weatherConditions.reduce((acc, condition) => {
          acc[condition] = (acc[condition] || 0) + 1;
          return acc;
        }, {});

        // Destroy existing charts if they exist
        if (barChart) {
          barChart.destroy();
        }
        if (doughnutChart) {
          doughnutChart.destroy();
        }
        if (lineChart) {
          lineChart.destroy();
        }

        // Bar Chart (Temperature)
        const barCtx = document.getElementById("barChart").getContext("2d");
        barChart = new Chart(barCtx, {
          type: "bar",
          data: {
            labels: days,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatures,
                backgroundColor: "rgba(75, 192, 192, 0.8)", // Slightly more opaque for contrast
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 10,
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // X-axis text color
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.5)", // Lighter grid for better visibility
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Y-axis text color
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.5)", // Lighter grid for better visibility
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white", // Legend text color
                  font: {
                    size: 14,
                  },
                },
              },
            },
            backgroundColor: "rgba(255, 255, 255, 1)", // White background for the entire chart area
          },
        });

        // Doughnut Chart (Weather Conditions)
        const doughnutCtx = document
          .getElementById("doughnutChart")
          .getContext("2d");
        doughnutChart = new Chart(doughnutCtx, {
          type: "doughnut",
          data: {
            labels: Object.keys(weatherCount),
            datasets: [
              {
                label: "Weather Conditions",
                data: Object.values(weatherCount),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.8)", // Clear
                  "rgba(54, 162, 235, 0.8)", // Rain
                  "rgba(255, 206, 86, 0.8)", // Clouds
                  "rgba(75, 192, 192, 0.8)", // Others
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "60%",
            plugins: {
              legend: {
                position: "top",
                labels: {
                  padding: 15,
                  color: "white", // Legend text color
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                bodyFont: {
                  size: 14,
                },
                padding: 10,
              },
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
              },
            },
          },
        });

        // Line Chart (Temperature Changes)
        const lineCtx = document.getElementById("lineChart").getContext("2d");
        lineChart = new Chart(lineCtx, {
          type: "line",
          data: {
            labels: days,
            datasets: [
              {
                label: "Temperature (°C)",
                data: temperatures,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
                pointBackgroundColor: "white",
                pointBorderColor: "rgba(75, 192, 192, 1)",
                pointRadius: 6,
                pointHoverRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 10,
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // X-axis text color
                  font: {
                    size: 12,
                  },
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.5)", // Lighter grid for better visibility
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white", // Y-axis text color
                  font: {
                    size: 12,
                  },
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.5)", // Lighter grid for better visibility
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white", // Legend text color
                  font: {
                    size: 14,
                  },
                },
              },
            },
            backgroundColor: "rgba(255, 255, 255, 1)", // White background for the entire chart area
          },
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Example usage
  // getCurrentWeatherByCity("Islamabad, PK");
  // getCurrentWeatherByCoords(51.5074, -0.1278);
  // get5DayForecastByCity("London");
  // get5DayForecastByCoords(51.5074, -0.1278);
  async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Call the function to fetch weather data using the user's coordinates
          const weatherData = await getCurrentWeatherByCoords(lat, lon);

          if (weatherData) {
            displayWeather(weatherData);
            console.log(weatherData.name);
            fetchWeatherAndGenerateCharts(weatherData.name);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCurrentLocationWeather();
  // Show the pop-up window
  document.getElementById("userIcon").addEventListener("click", function () {
    document.getElementById("popup").classList.remove("hidden");
  });

  // Close the pop-up window
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").classList.add("hidden");
  });
  const spinner = document.getElementById("loadingSpinner");

  // function showLoading() {
  //   const weatherDataElement = document.querySelector(".weather-data");
  //   if (weatherDataElement) {
  //     weatherDataElement.style.display = "none";
  //   }
  //   const chartElement = document.getElementById("charts");
  //   if (chartElement) {
  //     chartElement.style.display = "none";
  //   }

  //   spinner.style.display = "flex";
  // }
  function showLoading() {
    const weatherDataElement = document.querySelector(".weather-data");
    if (weatherDataElement) {
      weatherDataElement.style.display = "none";
    }

    const chartElement = document.getElementById("charts");
    if (chartElement) {
      chartElement.style.display = "none";
    }

    spinner.style.display = "flex";

    // Keep the loading state for 5 seconds
    setTimeout(() => {
      console.log();
    }, 10000); // 5000 milliseconds = 5 seconds
  }

  function hideLoading() {
    spinner.style.display = "none";
    const chartElement = document.getElementById("charts");
    if (chartElement) {
      chartElement.style.display = "grid";
    }
  }
  showLoading();
});
