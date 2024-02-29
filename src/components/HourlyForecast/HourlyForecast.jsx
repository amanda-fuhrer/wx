import { useEffect, useState } from "react";
import "./HourlyForecast.scss";

function HourlyForecast({ data, iconMapping }) {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    if (data.hourly) {
      setHourlyData(data.hourly);
    }
  }, [data]);

  const formatHour = (unixTime, timezoneOffset) => {
    const utcDate = new Date(unixTime * 1000);
    let hours = utcDate.getUTCHours();
    const offsetHours = Math.floor(timezoneOffset / 3600);
    hours += offsetHours;
    hours = hours >= 24 ? hours - 24 : hours < 0 ? hours + 24 : hours;
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedHours = hours.toString();
    return `${formattedHours}${ampm}`;
  };

  return (
    <section className="hourly-forecast">
      <h3 className="hourly-forecast__header">Today</h3>
      <div className="hourly-forecast__container">
        {hourlyData &&
          hourlyData.map((hour, index) => (
            <HourlyForecastItem
              key={index}
              time={formatHour(hour.dt, data.timezone_offset)}
              iconSrc={iconMapping[hour.weather[0].icon]}
              iconAlt={hour.weather[0].description}
              temperature={Math.round(hour.temp)}
            />
          ))}
      </div>
    </section>
  );
}

const HourlyForecastItem = ({ time, iconSrc, iconAlt, temperature }) => (
  <div className="hourly-forecast__item">
    <p className="hourly-forecast__time">{time}</p>
    <img src={iconSrc} alt={iconAlt} className="hourly-forecast__icon" />
    <p className="hourly-forecast__temperature">{temperature}°</p>
  </div>
);

export default HourlyForecast;
