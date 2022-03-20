<template>
  <nav class="navbar navbar-expand-md navbar-light bg-trasparent py-4">
    <div class="container-lg"><a class="navbar-brand me-md-5" href="#">
        <h1 class="visually-hidden">The F2E 3rd 前端薪資數據圖表調查</h1><img class="me-md-5" src="../assets/images/The_F2E.svg" title="The F2E 3rd 前端薪資數據圖表調查" alt="The F2E 3rd"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav fw-bold pt-3 pt-md-0 ps-md-1 d-flex w-100">
          <li class="nav-item me-md-4 pe-md-2"><a class="nav-link text-lighter" href="#">修練精神時光屋</a></li>
          <li class="nav-item dropdown"><a class="nav-link text-lighter dropdown-toggle" id="navDropBtn" href="#" data-bs-toggle="dropdown">薪資調查報告</a>
            <ul class="dropdown-menu dropdown-menu-dark border-lighter py-1 pe-1" arial-labelledby="navDropBtn">
              <li class="p-2">
                <router-link class="dropdown-item py-2 pe-5 me-3" to="/engineercharts">前端薪資調查報告</router-link>
              </li>
              <li>
                <hr class="dropdown-devider m-0"/>
              </li>
              <li class="p-2">
                <router-link class="dropdown-item py-2" to="/designercharts">UI 薪資調查報告</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.dropdown-devider {
  border-top: 1px solid #28234C;
}
.dropdown-toggle::after {
  display: none;
}
</style>
