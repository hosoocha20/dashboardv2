import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdRefresh, MdLocationPin } from "react-icons/md";
import rainSVG from "../../icons/day_rain.svg";
import CloudsSVG from "../../icons/day_partial_cloud.svg";
import thunderSVG from "../../icons/day_rain_thunder.svg";
import clearSVG from "../../icons/day_clear.svg";
import atmosphereSVG from "../../icons/fog.svg";
import snowSVG from "../../icons/day_snow.svg";
import drizzleSVG from "../../icons/rain.svg";
import nightCloudSVG from "../../icons/night_half_moon_partial_cloud.svg";
import nightRainSVG from "../../icons/night_half_moon_rain.svg";
import nightThunderSVG from "../../icons/night_half_moon_rain_thunder.svg";
import nightClearSVG from "../../icons/night_half_moon_clear.svg";
import nightSnowSVG from "../../icons/night_half_moon_snow.svg";

const WeatherWidget = () => {
  const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`;
  console.log(apiKey);
  const [weatherData, setWeatherData] = useState({});

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [temp, setTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windspeed, setWindspeed] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date());
  const min = String(refreshTime.getMinutes()).padStart(2, "0");
  const hour = String(refreshTime.getHours()).padStart(2, "0");


  function getLocation() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    // setLat(position.coords.latitude);
    // setLong(position.coords.longitude);
  }

  const fetchWeather = async () => {
    try {
      let position = await getLocation(),
        { coords } = position;
      console.log(position);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
      );
      const weather = await res.data;
      setWeatherData(weather);
      //console.log(weatherData)

      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    if (!weatherData?.main?.temp) return;
    setTemp(Math.round(weatherData.main.temp) + "°C");

    if (!weatherData?.wind?.speed) return;
    setWindspeed(weatherData.wind.speed);

    if (!weatherData?.main?.humidity) return;
    setHumidity(weatherData.main.humidity);

    if (!weatherData?.main?.feels_like) return;
    setFeelsLikeTemp(weatherData.main.feels_like);

    if (!weatherData?.weather[0]?.main) return;
    setWeatherDescription(weatherData.weather[0].main);
  }, [weatherData]);

  function handleRefresh() {
    fetchWeather();
    setShowLoading((currentShow) => !currentShow);
    setTimeout(() => {
      setShowLoading((currentShow) => !currentShow);
    }, 2500);
    setRefreshTime(new Date());
  }

  function getWeatherIcon(description) {
    let hour = refreshTime.getHours();
    if (hour < 18 && hour > 5) {
      if (description === "Rain") return rainSVG;
      if (description === "Thunderstorm") return thunderSVG;
      if (description === "Clouds") return CloudsSVG;
      if (description === "Clear") return clearSVG;
      if (description === "Atmosphere") return atmosphereSVG;
      if (description === "Snow") return snowSVG;
      if (description === "Drizzle") return drizzleSVG;
    } else {
      if (description === "Rain") return nightRainSVG;
      if (description === "Thunderstorm") return nightThunderSVG;
      if (description === "Clouds") return nightCloudSVG;
      if (description === "Clear") return nightClearSVG;
      if (description === "Atmosphere") return atmosphereSVG;
      if (description === "Snow") return nightSnowSVG;
      if (description === "Drizzle") return drizzleSVG;
    }

    return clearSVG;
  }

  return (
    <div className="weatherWidget">
      <div className="tempLocation">
        <img
          src={getWeatherIcon(weatherDescription)}
          alt="Weather Icon"
          id="weatherIcon"
        />
        <div className="temp-l">
          <div className="main-temp">{temp || "Loading..."}</div>
          <div className="icon-location">
            <MdLocationPin size={"14px"} />
            <div className="main-location">{weatherData.name}</div>
          </div>
        </div>
      </div>

      <div className="weatherInfo-grid">
        <div className="grid-item weatherHeading">Wind</div>
        <div className="grid-item weatherHeading">Humidity</div>
        <div className="grid-item weatherHeading">Feels Like</div>
        <div className="grid-item">
          {Math.round(windspeed)}
          <span className="units">m/s</span>
        </div>
        <div className="grid-item">
          {humidity}
          <span className="units">%</span>
        </div>
        <div className="grid-item">
          {Math.round(feelsLikeTemp)}
          <span className="units">°C</span>
        </div>
      </div>
      <div className="refresh-icon">
        {showLoading ? (
          <div className="loader"></div>
        ) : (
          <MdRefresh onClick={() => handleRefresh()} />
        )}
        <div className="updatedTime">
          {hour}:{min}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
