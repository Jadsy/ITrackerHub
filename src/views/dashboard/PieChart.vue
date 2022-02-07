<template>
  <div id="chart">
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {},
})
new Vue({
  el: '#app',
  components: {
    apexchart: VueApexCharts,
  },
  data: {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  },
})
</script>
