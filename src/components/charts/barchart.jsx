import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { MostAppliedDesignerChart } from '../../thunks/MostAppliedDesignerChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.MostAppliedDesignerChart);

    useEffect(() => {
        dispatch(MostAppliedDesignerChart());
        console.log(data);
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const barColors = [
        'rgba(75, 192, 192, 0.6)', 
        'rgba(153, 102, 255, 0.6)', 
        'rgba(255, 159, 64, 0.6)', 
        'rgba(255, 99, 132, 0.6)', 
        'rgba(54, 162, 235, 0.6)', 
        'rgba(255, 205, 86, 0.6)', 
        'rgba(201, 203, 207, 0.6)',
    
    ];

    const backgroundColors = data?.map((_, index) => barColors[index % barColors.length]);

    const chartData = {
        labels: data?.map((item) => item.user.firstName), 
        datasets: [
            {
                label: 'Applications',
                data: data?.map((item) => item.application_count),
                backgroundColor: backgroundColors, 
                borderColor: backgroundColors.map(color => color.replace('0.6', '1')), 
                borderWidth: 2,
                hoverBackgroundColor: backgroundColors.map(color => color.replace('0.6', '0.4')), 
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            x: { title: { display: true, text: 'DESIGNERS' }, },
            y: { title: { display: true, text: 'Applications' }, beginAtZero: true },
        },
    };

    return (
        <div className='card shadow-sm p-4' style={{ width: '700px', height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;
