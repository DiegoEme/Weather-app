import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

const LineChart = ({term}) => {
    const apiKey = "&lang=es&units=metric&appid=73e48893d12c632c3b7f98b00786a353"; //datos dia actual
    const forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" //datos 5 dias siguientes
     

    //props.list = array(40)

  const [chartData, setChartData] = useState({});
  const [list, setList] = useState([])  
  const [forecastDataMax, setForecastDataMax] = useState([])
  const [forecastDataMin, setForecastDataMin] = useState([])
  
  let maxTemp = [];
  let minTemp = [];

  const chart =  () => {
   fetch(`${forecast}${term}${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('estosi',data.list);             
      //setForecastData(data);

      for(let i = 0; i <= 40 ; i+= 6){
        maxTemp.push(data.list[i].main.temp_max);
        minTemp.push(data.list[i].main.temp_min);
        setForecastDataMax(maxTemp)
        setForecastDataMin(minTemp)
        console.log('compp', maxTemp, forecastDataMax)
      } 
      

      setChartData({
        
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Temperatura máxima',
            data: maxTemp,
            borderWidth: 4,
            type: 'line',
            fill: false,
            borderColor: 'red'
        }, {
          label: 'Temperatura mínima',
          data: minTemp,
          borderWidth: 4,
          type: 'line',
          fill: false,
          borderColor: 'blue'
        }],
      });
      
      console.log('arrays', minTemp, maxTemp);
    });
    
      let days = ['1', '2', '3', '4', '5'];
    /*   let maxTemp = [];
      let minTemp = [];

       for(let i = 0; i <= 40 ; i+= 7){
        maxTemp.push(props.list[i].main.temp_max);
        minTemp.push(props.list[i].main.temp_min)
      }  */
      //console.log(maxTemp, minTemp)

    /* setChartData({
    
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
          label: 'y',
          data: maxTemp, minTemp,
          //backgroundColor: 'aqua',
          borderWidth: 4
      }],
    }); */
  };

  useEffect(() => {
    chart()
  }, [])

  return(
    <div>
        <div style= {{height: "300px", width: "600px"}}>
            <Line data={chartData} options = {{
                responsive: true,
                title: {text: 'Pronóstico 5 días', display: true},
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                display: false
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                }
            }
               
            }/>
        </div>
    </div>
    
  );
};

export default LineChart;
