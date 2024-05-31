<template>
  <div>
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const barChart = ref(null)

onMounted(() => {
  const ctx = barChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'Jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      datasets: [
        {
          label: 'Gross margin',
          data: [20, 30, 40, 50, 60, 70, 60, 50, 40, 30, 20, 10],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Revenue',
          data: [30, 40, 50, 60, 70, 60, 50, 40, 30, 20, 10, 5],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
