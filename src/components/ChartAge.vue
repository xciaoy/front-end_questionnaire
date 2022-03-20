<template>
  <section class="chart px-2 px-sm-4">
    <header class="chart-header">
      <h4 class="chart-title">年齡</h4>
    </header>
    <main class="chart-body px-sm-1"><small class="chart-unit">單位：人</small>
      <BarChart class="chart-content" :chartData="chartData" :options="options"></BarChart>
    </main>
  </section>
</template>

<script>
import { ref } from 'vue'
import { BarChart } from 'vue-chart-3'
export default {
  components: { BarChart },
  props: {
    apiData: {
      type: Promise,
      default () { return [] }
    }
  },
  setup (props) {
    const apiData = ref(props.apiData)
    const ages = ref([])
    const counts = ref([])
    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          const age = people.age
            .replace('~', '-')
            .replace(' ', '')
          if (!ages.value.includes(age)) {
            ages.value.push(age)
            counts.value[ages.value.indexOf(age)] = 1
          } else {
            counts.value[ages.value.indexOf(age)] += 1
          }
        })
      })
    // chart
    const chartData = {
      labels: ages.value,
      datasets: [{
        maxBarThickness: 32,
        minBarLength: 5,
        data: counts.value
      }]
    }
    const options = {
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0
          }
        },
        y: {
          grid: {
            drawTicks: true,
            color: '#6B6783',
            tickColor: '#080231',
            tickLength: 24
          },
          min: 0,
          max: 250,
          ticks: {
            stepSize: 50
          }
        }
      }
    }
    return {
      chartData,
      options
    }
  }
}
</script>
