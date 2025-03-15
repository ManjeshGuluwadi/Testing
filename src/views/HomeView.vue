<template>
  <v-container>
    <!-- Search Area -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h3 mb-6">
          UV Index Query
        </h1>
      </v-col>
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-card>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" sm="8">
                <v-autocomplete
                  v-model="searchLocation"
                  :items="cities"
                  :loading="isSearching"
                  label="Search City"
                  placeholder="Enter city name, e.g: mel"
                  variant="outlined"
                  hide-details
                  clearable
                  item-title="name"
                  item-value="id"
                  return-object
                  :filter="customFilter"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="primary">mdi-map-marker</v-icon>
                  </template>

                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props">
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-city</v-icon>
                      </template>
                      <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.raw.region }}</v-list-item-subtitle>
                    </v-list-item>
                  </template>

                  <template v-slot:no-data>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-alert-circle</v-icon>
                      </template>
                      <v-list-item-title>
                        No matching cities found
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Please try another search term
                      </v-list-item-subtitle>
                    </v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" class="d-flex">
                <v-btn
                  color="primary"
                  class="ml-sm-3 mt-3 mt-sm-0"
                  block
                  :loading="loading"
                  :disabled="!searchLocation"
                  @click="searchUVIndex"
                >
                  <v-icon start>mdi-magnify</v-icon>
                  Go
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- UV Index Card -->
      <v-col cols="12" md="6" class="d-flex">
        <v-card class="mx-auto weather-card flex-grow-1" elevation="2">
          <v-card-title class="text-h5 pa-4 d-flex align-center">
            <v-icon color="warning" size="32" class="mr-3">mdi-white-balance-sunny</v-icon>
            UV Index
            <v-chip
              :color="uvIndexColor"
              class="ml-auto"
              size="large"
              label
            >
              {{ uvIndexLevel }}
            </v-chip>
          </v-card-title>

          <v-card-text class="pa-4">
            <div class="d-flex flex-column align-center mb-6">
              <div class="text-h1 font-weight-bold" :class="'text-'+uvIndexColor">
                {{ uvIndex }}
              </div>
              <div class="text-subtitle-1 text-grey mt-2">
                {{ currentLocation || 'Select a city' }}
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="uv-description">
              <div class="text-body-1">
                {{ uvIndexDescription }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Weather Information Card -->
      <v-col cols="12" md="6" class="d-flex">
        <v-card class="mx-auto weather-card flex-grow-1" elevation="2">
          <v-card-title class="text-h5 pa-4 d-flex align-center">
            <v-icon :color="getWeatherTipColor" size="32" class="mr-3">mdi-weather-partly-cloudy</v-icon>
            Weather Conditions
            <v-chip
              :color="getWeatherTipColor"
              class="ml-auto"
              size="large"
              label
            >
              {{ weatherDescription }}
            </v-chip>
          </v-card-title>

          <v-card-text class="pa-4">
            <div class="d-flex align-center justify-center mb-6">
              <v-icon size="64" class="mr-6" :color="weatherIcon === 'mdi-weather-sunny' ? 'warning' : getWeatherTipColor">
                {{ weatherIcon }}
              </v-icon>
              <div class="text-center">
                <div class="text-h1 font-weight-bold" :class="'text-'+getWeatherTipColor">{{ temperature }}°</div>
                <div class="text-subtitle-1 text-grey mt-2">Temperature</div>
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="d-flex justify-space-between text-body-1 mb-6">
              <div class="text-center">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon :color="getWeatherTipColor" size="32" class="mr-2">mdi-water-percent</v-icon>
                </div>
                <div class="text-h4 font-weight-bold">{{ humidity }}%</div>
                <div class="text-caption text-grey">Humidity</div>
              </div>
              <v-divider vertical></v-divider>
              <div class="text-center">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon :color="getWeatherTipColor" size="32" class="mr-2">mdi-weather-windy</v-icon>
                </div>
                <div class="text-h4 font-weight-bold">{{ windSpeed }}</div>
                <div class="text-caption text-grey">Wind (km/h)</div>
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="weather-tips">
              <div class="d-flex align-center mb-3">
                <v-icon :color="getWeatherTipColor" size="24" class="mr-3">{{ getWeatherTipIcon }}</v-icon>
                <div class="text-body-1">{{ getWeatherTip }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sunscreen Tips Card -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h5 d-flex align-center pa-4">
            <v-icon color="warning" size="32" class="mr-3">mdi-sun-clock</v-icon>
            Sun Protection Tips
          </v-card-title>
          <v-card-text class="pa-4">
            <v-row>
              <!-- Basic Sun Protection Knowledge -->
              <v-col cols="12" md="6" lg="3">
                <v-card variant="outlined" class="h-100">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon color="primary" size="large">mdi-book-open-variant</v-icon>
                    </template>
                    <v-card-title>Basic Knowledge</v-card-title>
                    <v-card-text class="text-body-1">
                      <ul>
                        <li>Higher SPF provides better protection</li>
                        <li>Apply sunscreen 15-30 minutes before exposure</li>
                        <li>Reapply every 2-3 hours</li>
                        <li>Protection needed even on cloudy days</li>
                      </ul>
                    </v-card-text>
                  </v-card-item>
                </v-card>
              </v-col>

              <!-- Sunscreen Product Selection -->
              <v-col cols="12" md="6" lg="3">
                <v-card variant="outlined" class="h-100">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon color="success" size="large">mdi-bottle-tonic-plus</v-icon>
                    </template>
                    <v-card-title>Product Selection</v-card-title>
                    <v-card-text class="text-body-1">
                      <ul>
                        <li>Choose SPF30+ sunscreen</li>
                        <li>Oily skin: Lightweight formula</li>
                        <li>Dry skin: Moisturizing formula</li>
                        <li>Sensitive skin: Physical sunscreen</li>
                      </ul>
                    </v-card-text>
                  </v-card-item>
                </v-card>
              </v-col>

              <!-- Usage Guidelines -->
              <v-col cols="12" md="6" lg="3">
                <v-card variant="outlined" class="h-100">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon color="warning" size="large">mdi-alert-circle</v-icon>
                    </template>
                    <v-card-title>Usage Guidelines</v-card-title>
                    <v-card-text class="text-body-1">
                      <ul>
                        <li>Apply evenly</li>
                        <li>Cover all exposed areas</li>
                        <li>Reapply after swimming</li>
                        <li>Use sufficient amount</li>
                      </ul>
                    </v-card-text>
                  </v-card-item>
                </v-card>
              </v-col>

              <!-- Common Myths -->
              <v-col cols="12" md="6" lg="3">
                <v-card variant="outlined" class="h-100">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon color="error" size="large">mdi-close-circle</v-icon>
                    </template>
                    <v-card-title>Common Myths</v-card-title>
                    <v-card-text class="text-body-1">
                      <ul>
                        <li>No need to reapply</li>
                        <li>No protection needed on cloudy days</li>
                        <li>Sunscreen harms the skin</li>
                        <li>Higher SPF is always better</li>
                      </ul>
                    </v-card-text>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Error Message -->
    <v-snackbar
      v-model="showError"
      :color="error ? 'error' : 'success'"
      :timeout="3000"
    >
      {{ error || successMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mockUVService } from '@/services/mockData'

const cities = [
  { id: 'sydney', name: 'Sydney', region: 'New South Wales' },
  { id: 'melbourne', name: 'Melbourne', region: 'Victoria' },
  { id: 'brisbane', name: 'Brisbane', region: 'Queensland' },
  { id: 'perth', name: 'Perth', region: 'Western Australia' },
  { id: 'adelaide', name: 'Adelaide', region: 'South Australia' },
  { id: 'goldcoast', name: 'Gold Coast', region: 'Queensland' },
  { id: 'canberra', name: 'Canberra', region: 'Australian Capital Territory' },
  { id: 'hobart', name: 'Hobart', region: 'Tasmania' },
  { id: 'darwin', name: 'Darwin', region: 'Northern Territory' },
  { id: 'newcastle', name: 'Newcastle', region: 'New South Wales' }
]

export default {
  name: 'HomeView',
  data() {
    return {
      searchLocation: null,
      cities,
      currentLocation: '',
      loading: false,
      isSearching: false,
      uvIndex: '--',
      temperature: '--',
      humidity: '--',
      windSpeed: '--',
      weatherDescription: 'Loading...',
      weatherIcon: 'mdi-weather-sunny',
      error: null,
      successMessage: '',
      showError: false,
    }
  },
  computed: {
    uvIndexLevel() {
      if (this.uvIndex === '--') return 'Unknown'
      const index = Number(this.uvIndex)
      if (index <= 2) return 'Low'
      if (index <= 5) return 'Moderate'
      if (index <= 7) return 'High'
      if (index <= 10) return 'Very High'
      return 'Extreme'
    },
    uvIndexColor() {
      if (this.uvIndex === '--') return 'grey'
      const index = Number(this.uvIndex)
      if (index <= 2) return 'success'
      if (index <= 5) return 'warning'
      if (index <= 7) return 'orange-darken-2'
      if (index <= 10) return 'error'
      return 'deep-purple'
    },
    uvIndexDescription() {
      if (this.uvIndex === '--') return 'Fetching UV index...'
      const index = Number(this.uvIndex)
      if (index <= 2) return 'No protection needed, safe for outdoor activities'
      if (index <= 5) return 'Basic protection required, use SPF15+ sunscreen'
      if (index <= 7) return 'Active protection needed, use SPF30+ sunscreen and wear a hat'
      if (index <= 10) return 'Extra protection needed, use SPF50+ sunscreen, avoid prolonged outdoor activities'
      return 'Full protection required, avoid going outside if possible'
    },
    getWeatherTip() {
      const temp = Number(this.temperature)
      if (temp >= 35) return 'High temperature alert, stay cool and hydrated'
      if (temp >= 30) return 'Hot weather, remember sun protection'
      if (temp >= 20) return 'Pleasant weather, perfect for outdoor activities'
      if (temp >= 10) return 'Comfortable temperature, dress accordingly'
      return 'Cold weather, stay warm'
    },
    getWeatherTipColor() {
      const temp = Number(this.temperature)
      if (temp >= 35) return 'error'
      if (temp >= 30) return 'warning'
      if (temp >= 20) return 'success'
      if (temp >= 10) return 'info'
      return 'primary'
    },
    getWeatherTipIcon() {
      const temp = Number(this.temperature)
      if (temp >= 35) return 'mdi-sun-thermometer'
      if (temp >= 30) return 'mdi-sun-wireless'
      if (temp >= 20) return 'mdi-weather-sunny'
      if (temp >= 10) return 'mdi-weather-partly-cloudy'
      return 'mdi-snowflake'
    }
  },
  methods: {
    customFilter(item, query) {
      if (!query) return true
      
      const searchQuery = query.toLowerCase().trim()
      const cityName = item.name.toLowerCase()
      const regionName = item.region.toLowerCase()
      
      // Check if city name contains search term
      const matchesCity = cityName.includes(searchQuery)
      // Check if region name contains search term
      const matchesRegion = regionName.includes(searchQuery)
      
      console.log('Searching:', searchQuery, 'in city:', cityName, 'matches:', matchesCity)
      
      return matchesCity || matchesRegion
    },
    async searchUVIndex() {
      if (!this.searchLocation) return
      
      this.loading = true
      try {
        const data = await mockUVService.getUVIndex(this.searchLocation)
        this.updateUVData(data)
        this.showSuccess(`Updated UV index for ${this.searchLocation.name}`)
      } catch (error) {
        console.error('Error fetching UV index:', error)
        this.error = 'Failed to fetch UV index, please try again'
        this.showError = true
      } finally {
        this.loading = false
      }
    },

    updateUVData(data) {
      this.currentLocation = data.location
      this.uvIndex = data.uvIndex
      this.temperature = data.temperature
      this.humidity = data.humidity
      this.windSpeed = data.windSpeed
      this.weatherDescription = data.weatherDescription
      this.weatherIcon = this.getWeatherIcon(data.weatherCode)
    },

    getWeatherIcon(code) {
      const iconMap = {
        'clear': 'mdi-weather-sunny',
        'cloudy': 'mdi-weather-cloudy',
        'rain': 'mdi-weather-rainy',
        'storm': 'mdi-weather-lightning-rainy',
        'snow': 'mdi-weather-snowy'
      }
      return iconMap[code] || 'mdi-weather-sunny'
    },

    showSuccess(message) {
      this.error = null
      this.successMessage = message
      this.showError = true
    }
  },
  watch: {
    searchLocation(value) {
      if (value && value !== this.searchLocation?.name) {
        this.searchUVIndex()
      }
    }
  }
}
</script>

<style scoped>
.weather-card {
  border-radius: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
  height: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.weather-card .v-card-title {
  flex-shrink: 0;
  padding: 16px !important;
}

.weather-card .v-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px !important;
}

.weather-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.text-h1 {
  font-size: 3.5rem !important;
  line-height: 1.2;
}

.text-h4 {
  font-size: 1.75rem !important;
  line-height: 1.2;
}

.mb-6 {
  margin-bottom: 16px !important;
}

.v-chip {
  font-weight: 600;
}

.weather-tips {
  background: rgba(0, 0, 0, 0.02);
  padding: 12px;
  border-radius: 8px;
  margin-top: auto;
}

.v-divider {
  opacity: 0.1;
}

.h-100 {
  height: 100%;
}

.text-grey {
  color: rgba(0, 0, 0, 0.6);
}

.v-card-text {
  font-size: 1.1rem;
}
</style> 