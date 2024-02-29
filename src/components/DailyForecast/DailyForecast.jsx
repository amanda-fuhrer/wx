import "./DailyForecast.scss";

function DailyForecast({ data, iconMapping }) {
  const getWeekday = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const renderDailyForecastItem = (day, index) => (
    <div key={index} className="daily-forecast__item">
      <p className="daily-forecast__date">{getWeekday(day.dt)}</p>
      <img
        src={iconMapping[day.weather[0].icon]}
        alt={day.weather[0].description}
        className="daily-forecast__icon"
      />
      <div className="daily-forecast__temperature-container">
        <p className="daily-forecast__temperature--high">
          {Math.round(day.temp.max)}°
        </p>
        <p className="daily-forecast__temperature--low">
          {Math.round(day.temp.min)}°
        </p>
      </div>
    </div>
  );

  return (
    <section className="daily-forecast">
      <div className="daily-forecast__container">
        {data.daily.slice(0, 7).map(renderDailyForecastItem)}
      </div>
    </section>
  );
}

export default DailyForecast;
