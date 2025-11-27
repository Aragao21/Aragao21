import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ data }) {
  const colors = ['#ED1C24', '#111111', '#5A5A5A', '#FF6B6B'];
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => Math.abs(item.total)),
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-flux-dark">Gastos por categoria</h3>
      </div>
      <Pie data={chartData} />
    </div>
  );
}
