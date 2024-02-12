import fewCloudsIcon from "./assets/icons/few-clouds.svg";
import cloudIcon from "./assets/icons/clouds.svg";
import thunderstormIcon from "./assets/icons/thunderstorm.svg";
import mistIcon from "./assets/icons/mist.svg";
import clearIcon from "./assets/icons/clear.svg";
import rainIcon from "./assets/icons/rain.svg";
import snowIcon from "./assets/icons/snow.svg";
import drizzleIcon from "./assets/icons/drizzle.svg";

import snow from "./assets/images/snow.svg";
import rain from "./assets/images/rain.svg";
import clear from "./assets/images/clear.svg";
import thunderstorm from "./assets/images/thunderstorm.svg";
import mist from "./assets/images/mist.svg";
import clearNight from "./assets/images/clear-night.svg";
import cloud from "./assets/images/cloud.svg";

export const iconMapping = {
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
  
  export const imageMapping = {
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "50d": mist,
    "50n": mist,
    "01d": clear,
    "01n": clearNight,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "09d": rain,
    "09n": rain,
  };
  
  export const backgroundClassMapping = {
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
  