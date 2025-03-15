<template>
  <v-card class="uv-card">
    <v-card-title class="text-center d-flex flex-column align-center pa-4">
      <div class="text-h5 mb-2">Real-time UV Index</div>
      <div class="text-subtitle-1 text-grey">UV Index</div>
    </v-card-title>

    <v-card-text class="text-center">
      <!-- UV Index Display -->
      <div class="uv-index-display mb-4">
        <div :class="['uv-number', `text-${uvIndexColor}`]">
          {{ uvIndex }}
        </div>
        <v-chip
          :color="uvIndexColor"
          :text-color="uvIndexColor === 'warning' ? 'black' : 'white'"
          size="large"
          class="mt-4"
        >
          {{ uvIndexLevelEn }}
        </v-chip>
      </div>

      <!-- Intensity Description -->
      <div class="uv-description mt-6">
        <v-alert
          :color="uvIndexColor"
          :icon="uvLevelIcon"
          variant="tonal"
          class="text-left"
        >
          <div class="text-subtitle-1 font-weight-bold mb-1">
            {{ uvIndexDescriptionEn }}
          </div>
        </v-alert>
      </div>

      <div class="mt-6 text-body-2 text-grey">
        <div class="mb-2">Last Updated: {{ lastUpdated }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UVIndexCard',
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uvIndex: 0,
      lastUpdated: new Date().toLocaleString(),
      // 模拟数据集
      mockData: {
        low: [1.2, 1.5, 1.8, 2.1, 2.4, 2.7],
        moderate: [3.2, 3.8, 4.3, 4.7, 5.2, 5.8],
        high: [6.2, 6.5, 6.8, 7.1, 7.4, 7.8],
        extreme: [8.2, 8.6, 9.1, 9.5, 10.2, 11.0]
      }
    }
  },
  computed: {
    uvIndexLevel() {
      if (this.uvIndex === 0) return 'Unknown'
      if (this.uvIndex < 3) return 'Low'
      if (this.uvIndex < 6) return 'Moderate'
      if (this.uvIndex < 8) return 'High'
      return 'Extreme'
    },
    uvIndexLevelEn() {
      if (this.uvIndex === 0) return 'Unknown'
      if (this.uvIndex < 3) return 'Low'
      if (this.uvIndex < 6) return 'Moderate'
      if (this.uvIndex < 8) return 'High'
      return 'Extreme'
    },
    uvIndexColor() {
      if (this.uvIndex === 0) return 'grey'
      if (this.uvIndex < 3) return 'success'
      if (this.uvIndex < 6) return 'warning'
      if (this.uvIndex < 8) return 'orange'
      return 'error'
    },
    uvLevelIcon() {
      if (this.uvIndex < 3) return 'mdi-weather-sunny'
      if (this.uvIndex < 6) return 'mdi-weather-sunny-alert'
      if (this.uvIndex < 8) return 'mdi-alert'
      return 'mdi-alert-octagon'
    },
    uvIndexDescription() {
      if (this.uvIndex === 0) return 'Fetching UV index...'
      if (this.uvIndex < 3) return 'Low UV intensity, safe for outdoor activities'
      if (this.uvIndex < 6) return 'Moderate UV intensity, basic protection needed'
      if (this.uvIndex < 8) return 'High UV intensity, full protection required'
      return 'Extreme UV intensity, avoid outdoor activities'
    },
    uvIndexDescriptionEn() {
      if (this.uvIndex === 0) return 'Fetching UV index...'
      if (this.uvIndex < 3) return 'Low UV intensity, safe for outdoor activities'
      if (this.uvIndex < 6) return 'Moderate UV intensity, basic protection needed'
      if (this.uvIndex < 8) return 'High UV intensity, full protection required'
      return 'Extreme UV intensity, avoid outdoor activities'
    }
  },
  methods: {
    updateUVIndex() {
      const hour = new Date().getHours()
      let dataSet
      
      if (hour < 8 || hour > 18) {
        dataSet = this.mockData.low
      } else if (hour < 10 || hour > 16) {
        dataSet = this.mockData.moderate
      } else if (hour < 12 || hour > 14) {
        dataSet = this.mockData.high
      } else {
        dataSet = this.mockData.extreme
      }
      
      const randomIndex = Math.floor(Math.random() * dataSet.length)
      this.uvIndex = dataSet[randomIndex]
      this.lastUpdated = new Date().toLocaleString()
    }
  },
  mounted() {
    this.updateUVIndex()
    setInterval(this.updateUVIndex, 30 * 60 * 1000)
  }
}
</script>

<style scoped>
.uv-card {
  min-height: 400px;
  border-radius: 16px;
}

.uv-index-display {
  padding: 2rem 0;
}

.uv-number {
  font-size: 8rem;
  font-weight: bold;
  line-height: 1;
  transition: color 0.3s ease;
}

.text-orange {
  color: #FB8C00;
}

.uv-description {
  max-width: 500px;
  margin: 0 auto;
}

.v-card {
  transition: all 0.3s ease;
}

.v-chip {
  font-weight: bold;
  font-size: 1.1rem;
}
</style> 