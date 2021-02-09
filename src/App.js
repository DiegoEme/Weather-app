import { useState } from "react";
import LineChart from "./LineChart";
import "./App.css";

const apiKey = "&lang=es&units=metric&appid=73e48893d12c632c3b7f98b00786a353"; //datos dia actual
const url = "https://api.openweathermap.org/data/2.5/weather?q="; //url base
//const urlZip = `https://api.openweathermap.org/data/2.5/weather?zip=${s}`; //datos 5 dias siguientes

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState({});
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  
  let dataLayer = [];
  //searchWeather se ejecuta al hacer clink en buscar
  const searchWeather = async () => {
    //Datos del dia actual
    await fetch(url + searchTerm + apiKey)
      .then((res) => res.json())
      .then((data) => {
        
        setWeather(data);
        dataLayer.push ({
          'event': 'ga_event',
          'category': 'Aplicativo',
          'action': data.name, //Valor dinámico - Nombre ciudad
          'label': data.main.temp//Valor dinamico -Temperatura actual
          });
        //Se establencen datos sunrise y sunset despues de hacer conversion de tiempos
        setSunrise(convertTime(data.sys.sunrise, data.timezone));
        setSunset(convertTime(data.sys.sunset, data.timezone));
      });

    setSearchTerm("");
  };

  const searchWeatherZip = async () => {
    //Datos del dia actual
    await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchTerm}` + apiKey)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setWeather(data);
        dataLayer.push ({
          'event': 'ga_event',
          'category': 'Aplicativo',
          'action': weather.name, //Valor dinámico - Nombre ciudad
          'label': weather.main.temp//Valor dinamico -Temperatura actual
          });
      
        //Se establencen datos sunrise y sunset despues de hacer conversion de tiempos
        setSunrise(convertTime(data.sys.sunrise, data.timezone));
        setSunset(convertTime(data.sys.sunset, data.timezone));
      });

    setSearchTerm("");
  };
  
  //Funcion que convierte los datos de sunrise y sunset
  function convertTime(unixTime, offset) {
    let dt = new Date((unixTime + offset) * 1000);
    let h = dt.getHours() + 5;
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

  function handleSearch() {
    var ddl = document.getElementById("select");
    var selectedValue = ddl.options[ddl.selectedIndex].value;
      if (selectedValue == "ciudad")
     {
      searchWeather()
     } else if (selectedValue == "zip"){
      searchWeatherZip()
     }
  }

  function showMore(e) {
    const btn = e.target
    if(btn.textContent == "Ver más"){
      btn.textContent = "Ver Menos"
    } else if (btn.textContent == "Ver Menos") {
      btn.textContent = "Ver más"
    }
    
    const cardBody = e.target.parentNode;
    const info = cardBody.nextElementSibling;
    info.classList.toggle("hidden");
  }

  
  return (
    <div className="App">
      <div className="searchBar">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Buscar..."
        />
        <select id="select" name="select" >
          <option value="ciudad" >Ciudad</option>
          <option value="zip" >
            Codigo ZIP, ID
          </option>
          
        </select>
        <button onClick={handleSearch} >Buscar</button>
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
                  <button className="btn" onClick={showMore}>Ver más</button>
                </div>
                <div className="card__info hidden">
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
