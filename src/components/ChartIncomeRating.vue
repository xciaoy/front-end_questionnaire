<template>
  <section class="chart">
    <header class="chart-header d-flex flex-column flex-md-row">
      <h4 class="chart-title me-auto">產業薪資與滿意度</h4>
      <nav class="mb-4 mb-md-0">
        <button class="btn btn-outline-lighter p-2 p-md-3 me-3 me-md-4" :disabled="!sectionedData.hasPre" @click="currentSection -= 1">＜ 前8筆</button>
        <button class="btn btn-outline-lighter p-2 p-md-3 me-3 me-md-5" :disabled="!sectionedData.hasNext" @click="currentSection += 1">後8筆 ＞</button>
        <div class="dropdown d-inline">
          <button class="btn btn-outline-lighter dropdown-toggle p-2 p-md-3" id="orderDropdown" data-bs-toggle="dropdown">依人數<span v-if="isMoreToLess"> 高到低</span><span v-else> 低到高</span></button>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="orderDropdown">
            <li>
              <button class="dropdown-item" @click="isMoreToLess = true">高到低</button>
            </li>
            <li>
              <button class="dropdown-item" @click="isMoreToLess = false">低到高</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main class="chart-body"><small class="chart-unit">單位：千元</small>
      <canvas class="chart-content ps-3" id="scoreChart"></canvas>
    </main>
  </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { addChart, sortData, sectionData, updateScoreChart } from '@/methods/scoreChart'
export default {
  props: {
    apiData: {
      type: Promise,
      default () { return [] }
    }
  },
  setup (props) {
    const resData = ref({})
    const sectionedData = ref({})
    const currentSection = ref(1)
    const isMoreToLess = ref(true)
    let salaryChart
    // add chart
    onMounted(async () => {
      resData.value = await props.apiData
      const sortedData = sortData(resData.value, isMoreToLess.value)
      sectionedData.value = sectionData(sortedData, currentSection.value)
      salaryChart = addChart(salaryChart, sectionedData.value.sectionData)
    })
    // change sort
    watch(isMoreToLess, () => {
      const sortedData = sortData(resData.value, isMoreToLess.value)
      currentSection.value = 1
      sectionedData.value = sectionData(sortedData, currentSection.value)
      updateScoreChart(salaryChart, sectionedData.value.sectionData)
    })
    // change section
    watch(currentSection, () => {
      const sortedData = sortData(resData.value, isMoreToLess.value)
      sectionedData.value = sectionData(sortedData, currentSection.value)
      updateScoreChart(salaryChart, sectionedData.value.sectionData)
    })
    return {
      isMoreToLess,
      currentSection,
      sectionedData
    }
  }
}
</script>
