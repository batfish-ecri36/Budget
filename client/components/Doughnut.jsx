import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({transactions}) => {
  const transData = {};  
  const trans = transactions.forEach(item => {
      if(!transData.hasOwnProperty(item.category)){
          transData[item.category] = Number(item.amount)
      }
      transData[item.category] += Number(item.amount)
  })
  const label = Object.keys(transData);
  const tableData = Object.values(transData);

  console.log('label:',label)
  console.log('data:', tableData);

  const data = {
    labels: label,
    datasets: [
      {
        label: "# of Votes",
        data: tableData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(53,162,235)',
        },  
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Summary",
        color:'rgb(53,162,235)',
      },
    },
  };

  return (
    <div>     
      <h2 style={{ maxWidth: '300px', margin: 'auto auto', color:'#4be7b9', marginBottom: '10px'}}>Doughnut Chart Display</h2>
      <Doughnut data={data} options={options} style={{ width: '500px', margin: 'auto auto'}}/>
    </div>
  );
};

export default DoughnutChart;
