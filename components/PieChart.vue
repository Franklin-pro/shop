<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const pieChart = ref(null)

onMounted(() => {
  const ctx = pieChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Living room 25%', 'Kids 13%', 'Office 4.5%', 'Bedroom 7%', 'Kitchen 10.3%', 'Bathroom 12%', 'Dining room 23.2%', 'Decor 32%', 'Lighting 6%', 'Outdoor 2.4%'],
      datasets: [
        {
          label: 'Sales by product category',
          data: [25, 17, 13, 12, 9, 8, 6, 5, 3, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
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
