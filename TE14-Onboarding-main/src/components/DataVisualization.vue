<template>
  <v-card class="visualization-card">
    <v-card-title>UV Data Trends</v-card-title>
    <v-card-text>
      <v-tabs v-model="activeTab">
        <v-tab value="cancer">Skin Cancer Trends</v-tab>
        <v-tab value="uv">UV Index Trends</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="cancer">
          <Line
            v-if="cancerData.datasets"
            :data="cancerData"
            :options="chartOptions"
          />
        </v-window-item>

        <v-window-item value="uv">
          <Line
            v-if="uvData.datasets"
            :data="uvData"
            :options="chartOptions"
          />
        </v-window-item>
      </v-window>

      <div class="mt-4">
        <h3>Data Interpretation</h3>
        <p>{{ currentExplanation }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'DataVisualization',
  components: {
    Line
  },
  data() {
    return {
      activeTab: 'cancer',
      cancerData: {
        labels: ['2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Victoria Skin Cancer Cases',
          data: [1200, 1300, 1400, 1450, 1500],
          borderColor: '#f87979',
          fill: false
        }]
      },
      uvData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Average UV Index',
          data: [12, 11, 9, 6, 4, 3],
          borderColor: '#7979f8',
          fill: false
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    currentExplanation() {
      return this.activeTab === 'cancer'
        ? 'Skin cancer incidence rates in Victoria show an upward trend, highlighting the importance of sun protection.'
        : 'UV index in Melbourne varies significantly with seasons, requiring extra sun protection during summer.'
    }
  },
  mounted() {
    // TODO: Fetch actual data from API
  }
}
</script>

<style scoped>
.visualization-card {
  height: 100%;
  min-height: 400px;
}
</style> 