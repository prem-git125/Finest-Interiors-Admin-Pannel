import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userdesignerCharts } from '../../thunks/userdesignerCharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data, loading, error } = useSelector((state) => state.userdesignerCharts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userdesignerCharts());
  }, [dispatch]);

  const chartData = {
    labels: ['Users', 'Designers'],
    datasets: [
      {
        data: [data?.usersCount || 0, data?.designersCount || 0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="card shadow-sm p-4"
      style={{
        width: '100%',
        height: '300px', 
        backgroundColor: '#fff',
      }}
    >
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
