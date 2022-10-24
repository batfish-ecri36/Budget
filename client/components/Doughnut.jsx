import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({transactions}) => {
  const transData = {};  
  const trans = transactions.forEach(item => {
      if(!transData.hasOwnProperty(item.category)){
          transData[item.category] = item.amount
      } else {
          transData[item.category] + item.amount
      }
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  return (
    <div>     
      <h1>Doughnut Chart Display</h1>
      <Doughnut data={data} style={{ width: '500px', margin: 'auto auto'}}/>
    </div>
  );
};

export default DoughnutChart;
