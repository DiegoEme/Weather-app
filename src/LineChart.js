import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

const LineChart = ({ term }) => {
  const apiKey = "&lang=es&units=metric&appid=73e48893d12c632c3b7f98b00786a353"; //datos dia actual
  const forecast = "https://api.openweathermap.org/data/2.5/forecast?q="; //datos 5 dias siguientes

  const [chartData, setChartData] = useState({});

  let maxTemp = [];
  let minTemp = [];

  const chart = () => {
    fetch(`${forecast}${term}${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("estosi", data.list);

        for (let i = 0; i <= 40; i += 6) {
          maxTemp.push(data.list[i].main.temp_max);
          minTemp.push(data.list[i].main.temp_min);
         
        }

        setChartData({
          labels: ["1", "2", "3", "4", "5"],
          datasets: [
            {
              label: "Temperatura máxima",
              data: maxTemp,
              borderWidth: 4,
              type: "line",
              fill: false,
              borderColor: "red",
              pointBorderWidth: 2
            },
            {
              label: "Temperatura mínima",
              data: minTemp,
              borderWidth: 4,
              type: "line",
              fill: false,
              borderColor: "blue",
              pointBorderWidth: 2
            },
          ],
        });

        console.log("arrays", minTemp, maxTemp);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <div style={{ height: "300px", width: "400px", margin: "auto" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Pronóstico 5 días", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
