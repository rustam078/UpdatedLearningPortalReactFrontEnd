import React from 'react';
import {
  Chart as ChartJs,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJs.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
)
const RadarChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.username),
    datasets: [
      {
        label: 'Total Content',
        data: data.map((item) => item.totalContent),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const maxTotalContent = Math.max(...data.map((item) => item.totalContent));
  const suggestedMin = 0;
  const suggestedMax = maxTotalContent < 5 ? 5 : Math.ceil(maxTotalContent / 5) * 5;

  const chartOptions = {
    scales: {
      r: {
        suggestedMin,
        suggestedMax,
        type: 'radialLinear', // Use 'linear' scale for the radar axis
      },
    },
  };

  return <Radar data={chartData} options={chartOptions} />;
};

export default RadarChartComponent;
