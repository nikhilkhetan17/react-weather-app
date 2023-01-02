import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "e1d0e5ffbaacec0bfe3bbc56370e7b3e",
  };

  const iconUrl = "https://openweathermap.org/img/w/";

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }

    if (e.key === "Enter" && input !== "") {
      fetch(`${api.url}weather?q=${input}&units=metric&appid=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch data");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
        });
    }
  };

  return (
    <section className="--100vh --center-all">
      <div className="container weather">
        <div className="weather-app --text-light">
          <br />
          <h1>Weather App</h1>
          <p>{date}</p>
          <div className="--form-control --my2">
            <input
              type="text"
              placeholder="Search City Name"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg !== "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <br />
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconUrl + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <br />
              <p>Temp: {Math.round(weather.main.temp)}°C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)}°C /{" "}
                {Math.round(weather.main.temp_max)}°C
              </p>
              <br />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Weather;
