import "./Chart.scss";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels,
  Filler
);

const createDataset = (label, data, key) => ({
  label,
  data: data.map((d) => ({ y: Math.round(d[key]), x: d.time })),
  backgroundColor: "white",
  borderColor: "black",
  tension: 0.4,
  pointRadius: 3,
});

function Chart({ data }) {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    if (!data.hourly || !data.hourly.length) return;

    const processWeatherData = (hourlyData) =>
      hourlyData.map((hour) => ({
        temp: hour.temp,
        time: formatHour(hour.dt),
      }));

    const createChartData = (processedData) => ({
      labels: processedData.map((d) => d.time),
      datasets: [createDataset("Hourly Temperature", processedData, "temp")],
    });

    const hoursToShow = 24;
    const processedData = processWeatherData(data.hourly.slice(0, hoursToShow));
    setChartData(createChartData(processedData));
  }, [data]);

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return `${hours}${ampm}`;
  };

  const chartOptions = {
    layout: { padding: { top: 30 } },
    scales: {
      x: { display: true, type: "category", grid: { display: false } },
      y: { display: false, type: "linear" },
    },
    plugins: {
      datalabels: {
        color: "black",
        align: "end",
        formatter: (value) => `${Math.round(value.y)}°`,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="chart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Chart;
