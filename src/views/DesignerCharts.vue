<template>
  <HeaderView :heading="heading" @toggle-basic="toggleBasic"></HeaderView>
  <BasicCharts v-if="isBasic"></BasicCharts>
  <SalaryChart v-else></SalaryChart>
</template>

<script>
import { ref } from 'vue'
import HeaderView from '@/components/HeaderView.vue'
import BasicCharts from '@/views/BasicCharts.vue'
import SalaryChart from '@/views/SalaryCharts.vue'
export default {
  components: {
    HeaderView,
    BasicCharts,
    SalaryChart
  },
  setup () {
    const heading = ref('UI 薪資調查報告')
    const isBasic = ref(true)

    function toggleBasic (emitBasic) {
      isBasic.value = emitBasic.value
    }

    return {
      heading,
      isBasic,
      toggleBasic
    }
  }
}
</script>
