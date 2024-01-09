<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
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
            label: "Total",
            backgroundColor: ["red","blue"], // Allows the Bar graph to have different colors 
           
            data: this.chartData,
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