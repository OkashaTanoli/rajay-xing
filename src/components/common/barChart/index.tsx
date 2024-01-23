// Import React and the Bar component from react-chartjs-2
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// BarChart component
const BarChart = () => {
    // Data for the chart
    const chartData = {
        labels: [
            'Token Issued',
            'Residents Pak to Iran',
            'Residents Iran to Pak',
            'Fuel Veh Pak to Iran',
            'Fuel Veh Iran to Pak'
        ],
        datasets: [
            {
                label: 'Counts',
                data: [123, 82, 53, 93, 150],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                barThickness: 60
            },
        ],
    };


    // Options for the chart
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Render the Bar chart with the data and options
    return <Bar data={chartData} options={options} />;
};

export default BarChart;
