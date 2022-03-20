<template>
  <section class="chart">
    <header class="chart-header">
      <h4 class="chart-title mb-5 pb-1">科系與學歷</h4>
      <div class="row">
        <BarChart class="col-10 custom chart-content" :chartData="chartData" :options="options"></BarChart>
        <div class="col-2 d-flex"><small class="chart-unit mt-auto mb-5 pb-4">單位：人</small></div>
      </div>
    </header>
  </section>
</template>

<style lang="scss" scoped>
.custom {
  height: 244.5px;
}
</style>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
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
    const route = useRoute()
    const degree = {
      department: (route.name === 'Designer') ? '設計科系相關' : '資訊科系相關',
      doctor: '博士',
      master: '碩士'
    }
    const departmentRex = new RegExp(degree.department)
    const doctorRex = new RegExp(degree.doctor)
    const masterRex = new RegExp(degree.master)
    const dataOfNormal = ref([0, 0])
    const dataOfHigh = ref([0, 0])
    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          const { major, education } = people
          switch (departmentRex.test(major)) {
            case true:
              if (doctorRex.test(education) || masterRex.test(education)) {
                dataOfHigh.value[0] += 1
              } else {
                dataOfNormal.value[0] += 1
              }
              break
            default:
              if (doctorRex.test(education) || masterRex.test(education)) {
                dataOfHigh.value[1] += 1
              } else {
                dataOfNormal.value[1] += 1
              }
              break
          }
        })
      })
    // chart
    const chartData = {
      labels: [degree.department, '非相關科系'],
      datasets: [
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: degree.department,
          label: '大學（含）以下',
          data: dataOfNormal.value,
          backgroundColor: '#8E7DFA'
        },
        {
          maxBarThickness: 32,
          minBarLength: 5,
          stack: degree.department,
          label: '碩博士',
          data: dataOfHigh.value,
          backgroundColor: '#D2CBFD'
        }
      ]
    }
    const options = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          titleColor: '#CECCD6',
          titleFont: { size: 12 },
          callbacks: {
            title: (context) => context[0].dataset.label,
            label: ({ dataset, dataIndex }) => `${dataset.data[dataIndex]} 人`
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 40,
            color: '#6B6783',
            boxWidth: 16
          }
        }
      },
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false
          }
        },
        x: {
          stacked: true,
          grid: {
            drawTicks: true,
            color: '#6B6783',
            tickColor: '#080231',
            tickLength: 24
          },
          min: 0,
          max: 320,
          ticks: {
            stepSize: 40
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
