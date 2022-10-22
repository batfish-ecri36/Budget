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
import axios from 'axios';

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
); 


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//dataset's data would be pull in from the backend

const MonthlyBarChart = () => {
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [data, setData] = useState([]);
    
    //data will fetch when page loads
    useEffect(() => {
        async (data) => {
            const response = await axios.get('http://localhost:3000/transactions/', data);
            if(response.status === 200){
                setData(data);
            }
        }
    }, [])
    console.log(data);

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels,
            datasets:[
                {
                    label: 'Monthly Spending',
                    data:[1,2,3,4,5,6,7,8,9,10,11,12],
                    borderColor: 'rgb(53,162,235)',
                    backgroundColor: 'rgba(52,162,235,0.4)',
                },
            ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Transaction Summary',
                }
            }
        })
    }, [])
    return (
        <div style={{ width: '1200px', margin: 'auto auto'}}>
           <h1>This is fake data!</h1>
            <Bar options={chartOptions} data={chartData}/>
        </div>
    )
}

export default MonthlyBarChart;