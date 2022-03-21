<template>
  <div class="container pb-1">
    <ChartJobTenure :apiData="rawData"></ChartJobTenure>
    <div class="w-100 py-4"></div>
    <ChartSalary :apiData="rawData"></ChartSalary>
    <div class="w-100 py-4"></div>
    <ChartIndustry :apiData="rawData"></ChartIndustry>
    <div class="w-100 py-4"></div>
    <ChartIncomeRating :apiData="rawData"></ChartIncomeRating>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ChartJobTenure from '@/components/ChartJobTenure.vue'
import ChartSalary from '@/components/ChartSalary.vue'
import ChartIndustry from '@/components/ChartIndustry.vue'
import ChartIncomeRating from '@/components/ChartIncomeRating.vue'
export default {
  components: {
    ChartJobTenure,
    ChartSalary,
    ChartIndustry,
    ChartIncomeRating
  },
  setup () {
    async function getData () {
      const route = useRoute()
      const api = (route.name === 'Designer')
        ? 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/ui_data.json'
        : 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json'
      const http = await fetch(api)
      const data = await http.json()
      return data
    }
    const rawData = ref(getData())
    return {
      rawData
    }
  }
}
</script>
