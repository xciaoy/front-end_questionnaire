<template>
  <section class="chart">
    <header class="chart-header">
      <h4 class="chart-title">年薪</h4>
    </header>
    <main class="chart-body"><small class="chart-unit">單位：千元</small>
      <canvas class="chart-content ps-3" ref="chart"></canvas>
    </main>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { Chart } from 'chart.js'
export default {
  props: {
    apiData: {
      type: Promise,
      default () { return [] }
    }
  },
  setup (props) {
    const labels = ['1年以下', '2-3年', '3-5年', '5-7年', '7-9年', '10年以上']
    const tenureRex = labels.map((label) => new RegExp(label))
    const tenureCount = labels.map(() => 0)
    const salaryCount = labels.map(() => 0)
    const counts = reactive([])
    const chart = ref(null)
    onMounted(async () => {
      const res = await reactive(props.apiData)
      res.forEach((people) => {
        const jobTenure = people.company.job_tenure
          .replace(' ', '')
          .replace('~', '-')
        const salary = Number(people.company.salary
          .replace(/[\u4e00-\u9fa5]/g, '')
          .split('~')
          .reduce((x, y) => (Number(x) + Number(y)) / 2))
        tenureRex.forEach((rex, index) => {
          if (rex.test(jobTenure)) {
            tenureCount[index] += 1
            salaryCount[index] += salary
          }
        })
      })
      salaryCount.forEach((salary, index) => {
        const average = Math.round((salary / tenureCount[index]) * 10)
        counts.push(average)
      })
      // chart data & options
      // eslint-disable-next-line no-unused-vars
      const salaryChart = new Chart(chart.value, {
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              data: counts,
              maxBarThickness: 48,
              minBarLength: 5,
              order: 2,
              label: '千元'
            }, {
              type: 'line',
              data: counts,
              label: '千元',
              borderColor: '#F9F8FE',
              borderWidth: 2,
              fill: true,
              pointBackgroundColor: '#8E7DFA',
              pointRadius: 10,
              pointBorderWidth: 3,
              order: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#6b6783',
                tickColor: '#080231',
                tickLength: 24
              },
              min: 0,
              max: 1200,
              ticks: {
                stepSize: 200
              }
            }
          }
        }
      })
    })
    return {
      chart
    }
  }
}
</script>
