import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("toronto");
  const [locationName, setLocationName] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [units, setUnits] = useState("metric");
  const apiKey = process.env.REACT_APP_API_KEY;

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

  return <div className="App"></div>;
}

export default App;
