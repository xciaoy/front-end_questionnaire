<template>
  <section class="chart">
    <header class="chart-header">
      <h4 class="chart-title">產業分佈</h4>
    </header>
    <main class="row gy-5">
      <div class="col-md-6">
        <div class="row g-0 w-100">
          <div class="col-4 d-flex align-items-center justify-content-lg-end justify-content-center" v-if="percentage.length !== 0">
            <div class="fw-bold d-flex flex-column align-items-center"><span>{{ percentage[1].label }}</span><span> {{ percentage[1].percentage }} %</span></div>
          </div>
          <PieChart class="chart-content col-4 offset-lg-1" :chartData="chartData"></PieChart>
          <div class="col-2 offset-1 d-flex align-items-center" v-if="percentage.length !== 0">
            <div class="fw-bold d-flex flex-column align-items-center"><span>{{ percentage[0].label }}</span><span>{{ 100 - percentage[1].percentage }} %</span></div>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <div class="chart-card py-4 bg-dark rounded">
          <div class="px-3 mx-3">
            <h6 class="fw-bold">自有產品公司之產業人數排名 Top 10</h6>
            <ul class="text-light d-flex flex-wrap row-cols-2">
              <li class="col-6" v-for="(industry, key) in top10" :key="key">{{ industry.category}}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { ref } from 'vue'
import { PieChart } from 'vue-chart-3'
export default {
  components: { PieChart },
  props: {
    apiData: {
      type: Promise,
      default () { return [] }
    }
  },
  setup (props) {
    const apiData = ref(props.apiData)
    const labels = ['接案公司', '自有產品']
    const target = '接案公司'
    const targetRex = new RegExp(target)
    const industries = []
    const industryCount = []
    const top10 = ref([])
    const data = ref(labels.map(() => 0))
    const percentage = ref(labels.map((label) => ({
      label,
      percentage: 0
    })))
    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          const { industry } = people.company
          // chart data
          if (targetRex.test(industry)) {
            data.value[labels.indexOf(industry)] += 1
          } else {
            data.value[1] += 1
            //  top 10
            if (!industries.includes(industry)) {
              industries.push(industry)
              industryCount.push({
                category: industry,
                count: 1
              })
            } else {
              industryCount[industries.indexOf(industry)].count += 1
            }
          }
        })
        // percentage
        percentage.value[0].percentage = Math.round((data.value[0] / rawData.length) * 100)
        percentage.value[1].percentage = 100 - percentage.value[0].percentage
        // top 10, bubble sort
        const len = industryCount.length
        for (let i = 0; i < len - 1; i += 1) {
          for (let j = 0; j < len - 1 - i; j += 1) {
            if (industryCount[j].count < industryCount[j + 1].count) {
              const temp = industryCount[j]
              industryCount[j] = industryCount[j + 1]
              industryCount[j + 1] = temp
            }
          }
        }
        industryCount.every((industry, index) => {
          top10.value.push(industry)
          return index < 9
        })
      })
    // chart
    const chartData = {
      labels,
      responsive: true,
      datasets: [{
        data: data.value,
        backgroundColor: [
          '#8E7DFA',
          '#D2CBFD'
        ]
      }]
    }
    return {
      chartData,
      percentage,
      top10
    }
  }
}
</script>

<style lang="scss">
.chart-card {
  max-width: 325px;
}
</style>
