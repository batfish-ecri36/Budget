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



//dataset's data would be pull in from the backend



const MonthlyBarChart = ({transactions}) => {
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

    const convertDate = (date) => {
        const toConvert = new Date(date);
        let converted = toConvert.toLocaleDateString('en-US', { timeZone: 'UTC' });
        return converted;
      };


    const transData = {};  
    const trans = transactions.forEach(item => {
        if(!transData.hasOwnProperty(item.date)){
            transData[convertDate(item.date)] = 0;
            transData[convertDate(item.date)] += Number(item.amount)
        }
        console.log(transData[convertDate(item.date)])
        transData[convertDate(item.date)] += Number(item.amount)
        console.log('line 67', item.amount) 
    })
    console.log('line 71',transData)

    const labels = Object.keys(transData);
    const tableData = Object.values(transData);
    console.log('line 75',tableData);

    const [chartOptions, setChartOptions] = useState({});

    //data has to be a one dimensional array
    //in this case we can show the monthly total spending 
    useEffect(() => {
        setChartData({
            labels: labels,
            datasets:[
                {
                    label: 'Daily Spending',
                    data: tableData,
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
        <div style={{ width: '700px', margin: 'auto auto'}}>
           <h1>Bar Chart Display</h1>
            <Bar options={chartOptions} data={chartData}/>
        </div>
    )
}

export default MonthlyBarChart;