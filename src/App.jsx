import "./App.scss";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//Components
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Header from "./components/Header/Header";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import Loader from "./components/Loader/Loader";
import { iconMapping, backgroundClassMapping } from "./weatherMappings";

const getBackgroundClass = (condition) => {
  return backgroundClassMapping[condition] || "";
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
    const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
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
          locationName={locationName}
          locationCountry={locationCountry}
        />
        <HourlyForecast data={weatherData} iconMapping={iconMapping} />
        <DailyForecast data={weatherData} iconMapping={iconMapping} />
    </section>
  );
}

export default App;
