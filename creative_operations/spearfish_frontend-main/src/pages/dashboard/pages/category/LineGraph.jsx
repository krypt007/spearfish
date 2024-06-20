import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const months = ['Jan', 'Feb', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  const lineGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 10,
          }
        }
      },
      y: {
        display: false,
      },
    },
    tooltips: {
      mode: 'point',
    },
    elements: {
      point: {
        radius: 6,
      },
    },
  };

  const lineGraphData = {
    labels: months.slice(0, 7),
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      tension: 0.1
    }]
  };

  return (
    <Line options={lineGraphOptions} data={lineGraphData} />
  );
};

export default LineGraph;
