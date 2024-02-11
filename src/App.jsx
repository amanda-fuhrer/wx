import "./App.scss";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Assets
import fewCloudsIcon from "./assets/icons/few-clouds.svg";
import cloudIcon from "./assets/icons/clouds.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import mistIcon from "./assets/icons/mist.svg";
import clearIcon from "./assets/icons/clear.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import drizzleIcon from "./assets/icons/drizzle.svg";

//Components
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Header from "./components/Header/Header";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import Chart from "./components/Chart/Chart";
import Loader from "./components/Loader/Loader";

const iconMapping = {
  "02d": fewCloudsIcon,
  "02n": fewCloudsIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": cloudIcon,
  "04n": cloudIcon,
  "11d": thunderstormIcon,
  "11n": thunderstormIcon,
  "50d": mistIcon,
  "50n": mistIcon,
  "01d": clearIcon,
  "01n": clearIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
  "09d": drizzleIcon,
  "09n": drizzleIcon,
};

const getBackgroundClass = (condition) => {
  const backgroundClasses = {
    "02d": "few-clouds-day",
    "02n": "few-clouds-night",
    "03d": "cloud-day",
    "03n": "cloud-night",
    "04d": "cloud-day",
    "04n": "cloud-night",
    "11d": "thunderstorm-day",
    "11n": "thunderstorm-night",
    "50d": "mist-day",
    "50n": "mist-night",
    "01d": "clear-day",
    "01n": "clear-night",
    "10d": "rain-day",
    "10n": "rain-night",
    "13d": "snow-day",
    "13n": "snow-night",
    "09d": "drizzle-day",
    "09n": "drizzle-night",
  };
  return backgroundClasses[condition] || "";
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("toronto");
  const [locationName, setLocationName] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [units, setUnits] = useState("metric");
  const [backgroundClass, setBackgroundClass] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  const updateWeather = (newLocation) => {
    setLocation(newLocation);
  };

  const fetchCoordinates = async (location, apiKey) => {
    const geocodingAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
    try {
      const response = await axios.get(geocodingAPI);
      const { lat, lon, country } = response.data[0];
      return { lat, lon, country };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw error;
    }
  };

  const fetchWeatherData = async (location, apiKey, units) => {
    try {
      const { lat, lon, country } = await fetchCoordinates(location, apiKey);
      const weatherAPI = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      const weatherResponse = await axios.get(weatherAPI);
      return {
        weatherData: weatherResponse.data,
        locationName: location,
        locationCountry: country,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const loadWeatherData = useCallback(async () => {
    try {
      const { weatherData, locationName, locationCountry } =
        await fetchWeatherData(location, apiKey, units);
      setWeatherData(weatherData);
      setLocationName(locationName);
      setLocationCountry(locationCountry);
    } catch (error) {
      console.error("Error loading weather data", error);
    }
  }, [location, apiKey, units]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  useEffect(() => {
    // Set background class based on weather condition
    if (weatherData) {
      const { icon } = weatherData.current.weather[0];
      const backgroundClass = getBackgroundClass(icon);
      setBackgroundClass(backgroundClass);
    }
  }, [weatherData]);

  if (!weatherData) {
    return <Loader />;
  }

  return (
    <section className={`App ${backgroundClass}`}>
      <Header
        updateWeather={updateWeather}
        data={weatherData}
        setUnits={setUnits}
        units={units}
      />
      <CurrentWeather
        data={weatherData}
        iconMapping={iconMapping}
        locationName={locationName}
        locationCountry={locationCountry}
      />
      <HourlyForecast data={weatherData} iconMapping={iconMapping} />
      <Chart data={weatherData} />
      <DailyForecast data={weatherData} iconMapping={iconMapping} />
    </section>
  );
}

export default App;
