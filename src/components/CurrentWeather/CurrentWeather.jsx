import "./CurrentWeather.scss";

function CurrentWeather({ data, locationName, locationCountry, imageMapping }) {
  const currentTemp = Math.round(data.current.temp);
  const highTemp = Math.round(data.daily[0].temp.max);
  const lowTemp = Math.round(data.daily[0].temp.min);
  const weatherDescription = data.current.weather[0].description;

  return (
    <section className="current-weather">
      <img src={imageMapping[data.current.weather[0].icon]} alt="current weather" className="current-weather__image"/>
      <div className="current-weather__container-left">
        <h1 className="current-weather__temperature">{currentTemp}°</h1>
        <div className="current-weather__high-low-wrapper--tablet">
          <div className="current-weather__high"><p>H: {highTemp}°</p></div>
          <div className="current-weather__low"><p>L: {lowTemp}°</p></div>
        </div>
      </div>

      <div className="current-weather__container-right">
        <p className="current-weather__location">{`${locationName}, ${locationCountry}`}</p>
        <p className="current-weather__description">{weatherDescription}</p>
        <div className="current-weather__high-low-wrapper">
          <div className="current-weather__high"><p>H: {highTemp}°</p></div>
          <div className="current-weather__low"><p>L: {lowTemp}°</p></div>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
