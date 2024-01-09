<template>
  <canvas ref="myChart"></canvas>
</template>

<script>

import Chart from "chart.js/auto"; //The code imports the the chartjs functions
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {       
      type: Array,  
    },
  },
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",  // bar chart declaration
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Total",  // The label that matches the endpoint
            backgroundColor: ["red","blue","green","yellow","orange","black","brown"], // color array so that each bar has a seperate color
            data: this.chartData
          },
          
        ],
      },
      options: {
        
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
};
</script>