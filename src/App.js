import { useState } from "react";
import "./App.css";

const api_key = "&lang=es&units=metric&appid=73e48893d12c632c3b7f98b00786a353";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState({});
  const [sunrise, setSunrise] = useState("")

  const searchWeather = async () => {
    await fetch(url + searchTerm + api_key)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
    setSearchTerm("");
    
  //let sSet = convertTime(weather.sys.sunset, weather.timezone);
  };

  

   function convertTime(unixTime, offset) {
    let dt = new Date((unixTime + offset) * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

  //let sRise = convertTime(weather.sys.sunrise, weather.timezone);
  //let sSet = convertTime(weather.sys.sunset, weather.timezone);

  return (
    <div className="App">
      <div className="searchBar">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {typeof weather.main != "undefined" ? (
        <div className="card">
          <div className="card__body">
            <h3 className="card__body--city">
              {weather.name}, {weather.sys.country}
            </h3>
            <div className="date">{new Date().toDateString()}</div>
            <h1 className="card__body--temp">
              {Math.round(weather.main.temp)} °C
            </h1>
            <h2 className="card__body--desc">
              {weather.weather[0].description}
            </h2>
            <p>max: {Math.round(weather.main.temp_max)} °C</p>
            <p>min: {Math.round(weather.main.temp_min)} °C</p>
          </div>
          <div className="card__info">
            <li>Viento {Math.round(weather.wind.speed)} km/h</li>
            <li>Humedad {weather.main.humidity}%</li>
            <li>Presión {weather.main.pressure} hPa</li>
            <li>Hora surise {sunrise}</li>
            
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
