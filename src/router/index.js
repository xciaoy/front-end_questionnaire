import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/EngineerCharts.vue')
      },
      {
        path: 'engineercharts',
        name: 'Engineer',
        component: () => import('../views/EngineerCharts.vue')
      },
      {
        path: 'designercharts',
        name: 'Designer',
        component: () => import('../views/DesignerCharts.vue')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
