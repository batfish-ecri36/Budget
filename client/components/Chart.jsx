import React, { useState, useEffect } from 'react'
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

const BarChart = (props) => {
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['Jan', 'Feb', 'March'],
            datasets:[
                {
                    label: 'Summary',
                    data:[1,2,3],
                    borderColor: 'rgb(53,162,235)',
                    backgroundColor: 'rgba(52,162,235,0.4)',
                },
            ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Transaction Summary',
                }
            }
        })
    }, [])
    return (
        <div>
           <h1>This is fake data!</h1>
            <Bar options={chartOptions} data={chartData}/>
        </div>
    )
}

export default BarChart;