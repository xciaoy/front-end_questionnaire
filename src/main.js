import { createApp } from 'vue'
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  // BubbleController,
  // DoughnutController,
  LineController,
  PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  // LogarithmicScale,
  // RadialLinearScale,
  // TimeScale,
  // TimeSeriesScale,
  // Decimation,
  // Filler,
  Legend,
  // Title,
  Tooltip
  // SubTitle,
} from 'chart.js'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min'

// chart.js
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  // BubbleController,
  // DoughnutController,
  LineController,
  PieController,
  // PolarAreaController,
  // RadarController,
  // ScatterController,
  CategoryScale,
  LinearScale,
  // LogarithmicScale,
  // RadialLinearScale,
  // TimeScale,
  // TimeSeriesScale,
  // Decimation,
  // Filler,
  Legend,
  // Title,
  Tooltip
  // SubTitle,
)

Chart.defaults.color = '#F2F2F4'
Chart.defaults.borderColor = '#6B6783'
Chart.defaults.elements.bar.hoverBorderColor = '#F9F8FE'
Chart.defaults.elements.bar.hoverBorderWidth = 3
Chart.defaults.elements.bar.backgroundColor = '#8E7DFA'
Chart.defaults.elements.bar.hoverBackgroundColor = '#8E7DFA'
Chart.defaults.elements.bar.borderRadius = 2
Chart.defaults.plugins.tooltip.backgroundColor = '#28234C'
Chart.defaults.plugins.tooltip.padding = {
  top: 12,
  bottom: 12,
  left: 16,
  right: 16
}
Chart.defaults.plugins.tooltip.titleAlign = 'center'
Chart.defaults.plugins.tooltip.titleMarginBottom = 8
Chart.defaults.plugins.tooltip.bodyFont = { size: 16 }
Chart.defaults.plugins.tooltip.caretSize = 10
Chart.defaults.plugins.tooltip.cornerRadius = 4
Chart.defaults.plugins.tooltip.displayColors = false
Chart.defaults.plugins.tooltip.callbacks
  .label = ({ dataset, dataIndex }) => `${dataset.data[dataIndex]} ${dataset.label}`
Chart.defaults.plugins.legend.display = false

window.addEventListener('resize', () => {
  if (window.innerWidth > 576) {
    Chart.defaults.font.size = 16
  } else {
    Chart.defaults.font.size = 12
  }
})

const metaManager = createMetaManager()

const app = createApp(App)

app.use(router)
app.use(metaManager)
app.use(metaPlugin)

app.mount('#app')
