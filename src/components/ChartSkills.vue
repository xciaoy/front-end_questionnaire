<template>
  <section class="chart">
    <header class="chart-header">
      <h4 class="chart-title mb-5 pb-1">第一份工作所採用之技術/軟體</h4>
      <main class="row gy-5">
        <div class="col-md-6">
          <BarChart class="custom-skill chart-content" :chartData="chartData" :options="options"></BarChart>
        </div>
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="chart-card py-4 bg-dark rounded">
            <div class="px-3 mx-3" v-if="$route.name !== &quot;Designer&quot;">
              <h6 class="fw-bold">後端語言</h6>
              <p class="text-light pb-4 mb-3">Node.js、Python、PHP、JAVA、Ruby</p>
              <h6 class="fw-bold">任務指派工具</h6>
              <p class="text-light pb-4 mb-3">Trello、asana</p>
              <h6 class="fw-bold">UI 標示工具</h6>
              <p class="text-light mb-0">Adobe XD、Figma</p>
            </div>
            <div class="px-3 mx-3" v-else>
              <h6 class="fw-bold">應用軟體</h6>
              <p class="text-light pb-4 mb-3">Adobe XD、Photoshop、Illustrator、Figma</p>
            </div>
          </div>
        </div>
      </main>
    </header>
  </section>
</template>

<style lang="scss" scoped>
.custom-skill {
  height: 288px;
}
</style>

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
    const engineerSkills = [
      'Git',
      '後端語言',
      '任務指派工具',
      'UI'
    ]
    const designerSkills = [
      'HTML、CSS',
      'jQuery',
      'JavaScript',
      '後端應用'
    ]
    const engineerLabels = [
      'Git 版本控制系統',
      '後端語言',
      '任務指派工具',
      'UI 標示工具'
    ]
    const designerLabels = [
      'HTML、CSS',
      'jQuery',
      'JavaScript',
      '後端應用'
    ]
    const route = useRoute()
    const skills = (route.name === 'Designer') ? designerSkills : engineerSkills
    const labels = (route.name === 'Designer') ? designerLabels : engineerLabels
    const skillsRex = skills.map((skill) => new RegExp(skill))
    const skillsData = ref([0, 0, 0, 0])
    const dataNum = ref([0])
    apiData.value
      .then((rawData) => {
        rawData.forEach((people) => {
          dataNum.value[0] += 1
          const { skill } = people.first_job
          skillsRex.forEach((skillRex, index) => {
            if (skillRex.test(skill)) {
              skillsData.value[index] += 1
            }
          })
        })
      })
    // chart
    const chartData = {
      labels,
      datasets: [
        {
          maxBarThickness: 32,
          minBarLength: 5,
          data: skillsData.value,
          backgroundColor: '#8E7DFA',
          label: '人'
        }
      ]
    }
    const options = {
      indexAxis: 'y',
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
          max: dataNum.value,
          ticks: {
            // 以百分比呈現ticks
            callback: (value) => `${((value / dataNum.value) * 100).toFixed(0)}%`,
            stepSize: () => dataNum.value * 0.2
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
