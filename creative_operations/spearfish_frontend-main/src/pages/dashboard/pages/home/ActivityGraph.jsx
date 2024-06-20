import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

const ActivityGraph = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const months = ['Jan', 'Feb', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  const data = {
    labels: months.slice(0, 7),
    datasets: [{
      label: "Spent",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 2,
      borderRadius: 50,
    }]
  };

  return (
    <div style={{ marginBottom: '80px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ActivityGraph;
