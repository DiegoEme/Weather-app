import {useState} from 'react'
import './App.css';

const api_key = '&appid=73e48893d12c632c3b7f98b00786a353';
const url = 'https://api.openweathermap.org/data/2.5/weather?q='

function App() {
const [searchTerm, setSearchTerm] = useState('');
const [weather, setWeather] = useState({});

const searchWeather = async() => {
  await fetch(url+searchTerm+api_key)
  .then(res => res.json())
  .then((data) => {
    console.log(data)
    setWeather(data)
  })
  setSearchTerm('')
}

  return (
    <div className="App">
      <div>
        <input 
        value = {searchTerm}
        onChange={e => setSearchTerm(e.target.value)} 
        type="text" 
        placeholder="Search..."/>
        <button onClick={searchWeather}>Search</button>
      </div>
    </div>
  );
}

export default App;
