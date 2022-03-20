<template>
  <head class="container d-flex flex-column align-items-center">
    <h2 class="fw-bold pb-2">{{ Heading }}</h2>
    <div class="row switch mt-5 w-100">
      <div class="col-12 col-sm-8 offset-md-2 col-md-6 offset-lg-4 col-lg-4">
        <div class="p-2 border border-lighter rounded d-flex">
          <button class="fw-bold btn py-2 w-50 me-2" :class="{ &quot;btn-switched&quot;: isBasic }" @click="toggleBasic(true)">基本資料</button>
          <button class="fw-bold btn py-2 w-50" :class="{ &quot;btn-switched&quot;: !isBasic }" @click="toggleBasic(false)">薪資與產業</button>
        </div>
      </div>
      <div class="dropdown col-12 col-sm-4 text-center text-sm-end mt-3 mt-sm-0">
        <a class="dropdown-toggle btn bg-darker text-lighter px-4 py-3" id="headDropBtn" href="#" data-bs-toggle="dropdown">
          <span class="me-5">2021</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark" arial-labelledby="headDropBtn">
          <li><a class="dropdown-item" href="#">2021</a></li>
        </ul>
      </div>
    </div>
  </head>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 45px;
}
.switch {
  margin-bottom: 60px;
}
.btn {
  color: #9c9aad;
}
.btn:hover, .btn-switched {
    background-color: #f2f2f4;
    color: #080231;
}
</style>

<script>
import { ref } from 'vue'
export default {
  props: {
    heading: {
      type: String,
      default () { return '' }
    }
  },
  setup (props, { emit }) {
    const Heading = ref(props.heading)
    const isBasic = ref(true)
    function toggleBasic (isToggle) {
      isBasic.value = isToggle
      emit('toggle-basic', isBasic)
    }
    return {
      Heading,
      isBasic,
      toggleBasic
    }
  }
}
</script>
