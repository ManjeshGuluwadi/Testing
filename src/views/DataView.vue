<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">
          UV Impact Data Analysis
        </h1>
      </v-col>

      <!-- Year selector and Go button -->
      <v-col cols="12" class="mb-6">
        <v-row align="center">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedYear"
              :items="availableYears"
              label="Select Year"
              variant="outlined"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-btn
              color="primary"
              block
              @click="updateCharts"
              :loading="loading"
            >
              Go
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Trend 1: Age Group Distribution -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">
            Age Group Distribution
          </v-card-title>
          <v-card-text>
            <div class="chart-container">
              <div v-if="loading" class="text-center pa-12">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2">Loading...</div>
              </div>
              <Bar
                v-else
                :key="chartKey"
                :chartData="ageGroupData"
                :options="barOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Trend 2: State Distribution -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">
            State Distribution
          </v-card-title>
          <v-card-text>
            <div class="chart-container">
              <div v-if="loading" class="text-center pa-12">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2">Loading...</div>
              </div>
              <Bar
                v-else
                :key="chartKey"
                :chartData="stateData"
                :options="barOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Temperature Trend -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Australian Temperature Trends
          </v-card-title>
          <v-card-text>
            <div class="chart-container">
              <div v-if="loading" class="text-center pa-12">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2">Loading...</div>
              </div>
              <Line
                v-else
                :key="chartKey"
                :chartData="temperatureData"
                :options="lineOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Data information -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Data Information
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <strong>Data Source</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Sample data for demonstration purposes
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <strong>Update Frequency</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Data is updated when selecting different years
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <strong>Usage Instructions</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  Select a year and click 'Go' to view the data analysis for that specific year
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const defaultData = {
  ageGroup: {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [{
      label: 'UV Protection Awareness by Age',
      data: [65, 75, 60, 55, 45],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  state: {
    labels: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'],
    datasets: [{
      label: 'UV Index by State',
      data: [8, 7, 9, 8.5, 7.5, 6, 9.5, 7],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  temperature: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Average Temperature',
      data: [30, 29, 27, 24, 20, 17, 16, 18, 21, 24, 26, 28],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: true
    }]
  }
}

export default {
  name: 'DataView',
  components: {
    Bar,
    Line
  },
  data() {
    return {
      loading: true,
      selectedYear: 'Year 2020',
      availableYears: [
        'Year 2020',
        'Year 2019',
        'Year 2018',
        'Year 2017',
        'Year 2016',
        'Year 2015',
        'Year 2014',
        'Year 2013',
        'Year 2012',
        'Year 2011',
        'Year 2010',
        'Year 2009',
        'Year 2008',
        'Year 2007'
      ],
      chartKey: 0,
      ageGroupData: { ...defaultData.ageGroup },
      stateData: { ...defaultData.state },
      temperatureData: { ...defaultData.temperature },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      lineOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    }
  },
  methods: {
    generateMockData(year) {
      const yearNum = parseInt(year.replace('Year ', ''))
      const baseValue = yearNum - 2019
      
      return {
        ageGroup: {
          labels: defaultData.ageGroup.labels,
          datasets: [{
            ...defaultData.ageGroup.datasets[0],
            data: defaultData.ageGroup.datasets[0].data.map(value => value + baseValue * 2)
          }]
        },
        state: {
          labels: defaultData.state.labels,
          datasets: [{
            ...defaultData.state.datasets[0],
            data: defaultData.state.datasets[0].data.map(value => value + baseValue)
          }]
        },
        temperature: {
          labels: defaultData.temperature.labels,
          datasets: [{
            ...defaultData.temperature.datasets[0],
            data: defaultData.temperature.datasets[0].data.map(value => value + baseValue)
          }]
        }
      }
    },
    updateCharts() {
      this.loading = true
      setTimeout(() => {
        const mockData = this.generateMockData(this.selectedYear)
        this.chartKey++ // 强制重新渲染图表
        this.ageGroupData = mockData.ageGroup
        this.stateData = mockData.state
        this.temperatureData = mockData.temperature
        this.loading = false
      }, 500)
    }
  },
  mounted() {
    this.updateCharts()
  }
}
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}

.v-card {
  margin-bottom: 20px;
}

.text-grey {
  color: rgba(0, 0, 0, 0.6);
}
</style> 