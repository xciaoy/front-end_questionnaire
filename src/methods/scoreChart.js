import { Chart } from 'chart.js'

function sortData (rawData, isMoreToLess) {
  const industries = []
  const industryCount = []

  rawData.forEach((people) => {
    const { industry } = people.company
    const salary = Number(people.company.salary
      .replace(/[\u4e00-\u9fa5]/g, '')
      .split('~')
      .reduce((x, y) => (Number(x) + Number(y)) / 2))
    const score = Number(people.company.salary_score)

    if (!industries.includes(industry)) {
      industries.push(industry)
      industryCount.push({
        category: industry,
        count: 1,
        salary,
        score
      })
    } else {
      industryCount[industries.indexOf(industry)].count += 1
      industryCount[industries.indexOf(industry)].salary += salary
      industryCount[industries.indexOf(industry)].score += score
    }
  })

  // get average
  industryCount.forEach((industry, index) => {
    const salaryAverage = Math.round(
      (industry.salary / industry.count) * 10
    )
    const scoreAverage = Math.round(
      (industry.score / industry.count)
    )

    industryCount[index].salary = salaryAverage
    industryCount[index].score = scoreAverage
  })

  // sort
  const len = industryCount.length
  if (isMoreToLess) {
    for (let i = 0; i < len - 1; i += 1) {
      for (let j = 0; j < len - 1 - i; j += 1) {
        if (industryCount[j].count < industryCount[j + 1].count) {
          const temp = industryCount[j]
          industryCount[j] = industryCount[j + 1]
          industryCount[j + 1] = temp
        }
      }
    }
  } else {
    for (let i = 0; i < len - 1; i += 1) {
      for (let j = 0; j < len - 1 - i; j += 1) {
        if (industryCount[j].count > industryCount[j + 1].count) {
          const temp = industryCount[j]
          industryCount[j] = industryCount[j + 1]
          industryCount[j + 1] = temp
        }
      }
    }
  }

  return industryCount
}

function sectionData (data, newSection) {
  const dataTotal = data.length
  const perSection = 8
  const sectionTotal = Math.ceil(dataTotal / perSection)

  let currentSection = newSection
  if (currentSection > sectionTotal) {
    currentSection = sectionTotal
  } else if (currentSection < 1) {
    currentSection = 1
  }

  // 該section第一筆資料
  const minData = (currentSection * perSection) - perSection + 1
  // 該section最後一筆資料
  const maxData = (currentSection * perSection)

  const section = {
    sectionTotal,
    currentSection,
    hasPre: currentSection > 1,
    hasNext: currentSection < sectionTotal,
    sectionNum: 0,
    sectionData: []
  }

  data.forEach((item, index) => {
    const num = index + 1
    if (num >= minData && num <= maxData) {
      section.sectionData.push(item)
    }

    if (num % perSection === 0) {
      section.sectionNum += 1
    }
  })

  return section
}

function addChart (chart, sectionedData) {
  const labels = sectionedData.map((data) => data.category)
  const salaryData = sectionedData.map((data) => data.salary)
  const scoreData = sectionedData.map((data) => data.score)

  const scoreChart = document.querySelector('#scoreChart')

  chart = new Chart(scoreChart, {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          data: salaryData,
          label: '千元',
          maxBarThickness: 48,
          minBarLength: 5,
          order: 2
        }, {
          type: 'line',
          yAxisID: 'ratingScale',
          data: scoreData,
          label: '分',
          borderColor: '#F9F8FE',
          borderWidth: 2,
          fill: true,
          pointBackgroundColor: '#8E7DFA',
          pointRadius: 10,
          pointBorderWidth: 3,
          order: 1
        }
      ]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#6b6783',
            tickColor: '#080231',
            tickLength: 24
          },
          min: 0,
          max: 1200,
          ticks: {
            stepSize: 200
          }
        },
        ratingScale: {
          position: 'right',
          min: 0,
          max: 10,
          grid: {
            display: false,
            tickColor: '#080231',
            tickLength: 24
          },
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  })

  return chart
}

function updateScoreChart (chart, sectionedData) {
  const labels = sectionedData.map((data) => data.category)
  const salaryData = sectionedData.map((data) => data.salary)
  const scoreData = sectionedData.map((data) => data.score)

  chart.data.labels = labels
  chart.data.datasets[0].data = salaryData
  chart.data.datasets[1].data = scoreData

  chart.update()
}

export {
  addChart, sortData, sectionData, updateScoreChart
}
