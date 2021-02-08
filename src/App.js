import { useState } from "react";
import LineChart from "./LineChart";
import "./App.css";

const apiKey = "&lang=es&units=metric&appid=73e48893d12c632c3b7f98b00786a353"; //datos dia actual
const url = "https://api.openweathermap.org/data/2.5/weather?q="; //url base
const forecast = "https://api.openweathermap.org/data/2.5/forecast?q="; //datos 5 dias siguientes

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState({});
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [forecastData, setForecastData] = useState({});

  //searchWeather se ejecuta al hacer clink en buscar
  const searchWeather = async () => {
    //Datos del dia actual
    await fetch(url + searchTerm + apiKey)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setWeather(data);

        //Se establencen datos sunrise y sunset despues de hacer conversion de tiempos
        setSunrise(convertTime(data.sys.sunrise, data.timezone));
        setSunset(convertTime(data.sys.sunset, data.timezone));
      });

    //Se borra la barra de busqueda
    setSearchTerm("");

    //Datos pronostico 5 dias siguientes
    /* await fetch(`${forecast}${searchTerm}${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);             
        setForecastData(data)
      }); */
  };

  //Funcion que convierte los datos de sunrise y sunset
  function convertTime(unixTime, offset) {
    let dt = new Date((unixTime + offset) * 1000);
    let h = dt.getHours() + 5;
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

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
        <div className="container">
          <div className="row">
            <div className="col">
            <div className="card ">
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
                <li>Salida de sol {sunrise}</li>
                <li>Puesta de sol {sunset}</li>
              </div>
              </div>
            </div>
            <div className="col">
              <div className="chart">
              <LineChart term={searchTerm} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
