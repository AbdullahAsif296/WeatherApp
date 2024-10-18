#Weather Dashboard

WeatherApp is a fully responsive weather dashboard that provides current weather information and a 5-day forecast using the OpenWeather API. It also includes a chatbot powered by Dialogflow for answering weather-related queries.

## Live Demo

You can access the live version of WeatheAppr at: [https://nexus-weather-511.web.app](https://nexus-weather-511.web.app)

## Features

- Current weather information
- 5-day weather forecast
- Interactive charts using Chart.js
- Customizable filters for weather data
- Unit conversion (Celsius/Fahrenheit)
- Chatbot integration for weather queries
- Responsive design
- Geolocation support
- Advanced filtering options

### Filtering Options

- Show temperatures in ascending order
- Show temperatures in descending order
- Filter out days without rain
- Show the day with the highest temperature

### Geolocation Support

The dashboard uses the browser's geolocation API to detect the user's location and show weather information for that location by default.

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript (jQuery)
- OpenWeather API
- Gemini API
- Chart.js


## Setup and Running Locally

1. Clone the repository:
   ```
   git clone 
   cd 
   ```

2. Open `index.html` in your web browser to view the landing page.

3. index.html contains main dashboard or `src/pages/table.html` for the forecast table.

4. Ensure you have an active internet connection for API calls and external resources.

## API Keys

To run the project locally with full functionality, you'll need to set up the following API keys:

1. OpenWeather API:
   - Sign up at [OpenWeather](https://openweathermap.org/api)
   - Replace `YOUR_OPENWEATHER_API_KEY` in `src/js/app.js` with your actual API key

2. Gemini API:
   - Set up a project in [Gemini](https://ai.google.dev/aistudio)
   - Replace the `agent-id` in the `<df-messenger>` tag in both HTML files with your Dialogflow agent ID



## Additional Notes

- The project uses the free tier of OpenWeather API, which has a limit of 60 calls/minute. Please be mindful of this limitation when testing.
- The project includes various filters for the weather data, accessible through the dropdown menu on the table page.
- Geolocation functionality requires user permission and a secure context (HTTPS) to work properly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
