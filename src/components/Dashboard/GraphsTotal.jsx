import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ventas mensuales de mariscos',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value, index, values) {
          return '$' + value;
        },
      },
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

const data = {
  labels,
  datasets: [
    {
      label: 'Ventas de camarones',
      data: [15000, 20000, 18000, 22000, 25000, 19000, 28000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Ventas de pescados',
      data: [12000, 15000, 14000, 17000, 18000, 16000, 20000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Ventas de mariscadas',
      data: [18000, 22000, 20000, 25000, 28000, 21000, 30000],
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
  ],
};

function GraphsTotal() {
  return <Bar options={options} data={data} />;
}

export default GraphsTotal;
