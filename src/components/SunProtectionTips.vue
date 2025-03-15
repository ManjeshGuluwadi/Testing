<template>
  <v-card class="tips-card">
    <v-card-title>Sun Protection Clothing Recommendations</v-card-title>
    <v-card-text>
      <div class="search-section mb-4">
        <v-select
          v-model="selectedUvLevel"
          :items="uvLevels"
          label="Select UV Index Range"
          item-title="text"
          item-value="value"
          class="mb-2"
        ></v-select>
        <v-btn
          color="primary"
          block
          @click="searchRecommendations"
          :disabled="!selectedUvLevel"
        >
          Search
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="text-subtitle-1">
              <v-icon color="indigo" class="mr-2">mdi-hanger</v-icon>
              Daily Wear
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, index) in casualWear" :key="index">
                  <v-list-item-title class="d-flex align-center">
                    <v-icon :color="item.color" class="mr-2" small>{{ item.icon }}</v-icon>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    UPF: {{ item.upf }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="text-subtitle-1">
              <v-icon color="green" class="mr-2">mdi-run</v-icon>
              Sports Gear
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, index) in sportsWear" :key="index">
                  <v-list-item-title class="d-flex align-center">
                    <v-icon :color="item.color" class="mr-2" small>{{ item.icon }}</v-icon>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    UPF: {{ item.upf }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="text-subtitle-1">
              <v-icon color="orange" class="mr-2">mdi-umbrella-beach</v-icon>
              Beach Gear
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, index) in beachWear" :key="index">
                  <v-list-item-title class="d-flex align-center">
                    <v-icon :color="item.color" class="mr-2" small>{{ item.icon }}</v-icon>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    UPF: {{ item.upf }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert
        type="info"
        class="mt-4"
      >
        {{ uvLevelTip }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SunProtectionTips',
  data() {
    return {
      selectedUvLevel: '',
      uvLevels: [
        { text: 'UV Index 1.0-3.0 (Low)', value: 'low' },
        { text: 'UV Index 3.0-6.0 (Moderate)', value: 'moderate' },
        { text: 'UV Index 6.0-9.0 (High)', value: 'high' },
        { text: 'UV Index 9.0+ (Extreme)', value: 'extreme' }
      ],
      casualWear: [],
      sportsWear: [],
      beachWear: [],
      uvLevelTip: ''
    }
  },
  methods: {
    searchRecommendations() {
      switch(this.selectedUvLevel) {
        case 'low':
          this.casualWear = [
            { name: 'Light Long Sleeve Shirt', icon: 'mdi-tshirt-crew', color: 'blue', upf: '15+' },
            { name: 'Casual Sun Hat', icon: 'mdi-hat-fedora', color: 'grey', upf: '15+' }
          ]
          this.sportsWear = [
            { name: 'Quick-dry Sports Shirt', icon: 'mdi-tshirt-crew', color: 'green', upf: '15+' },
            { name: 'Sports Cap', icon: 'mdi-hat-fedora', color: 'green', upf: '15+' }
          ]
          this.beachWear = [
            { name: 'UV Protection Swimwear', icon: 'mdi-swim', color: 'cyan', upf: '15+' },
            { name: 'Beach Hat', icon: 'mdi-hat-fedora', color: 'orange', upf: '15+' }
          ]
          this.uvLevelTip = 'Low UV intensity environment. Basic UPF15+ protection is sufficient for outdoor activities.'
          break
        case 'moderate':
          this.casualWear = [
            { name: 'UPF30+ Protection Shirt', icon: 'mdi-tshirt-crew', color: 'blue', upf: '30+' },
            { name: 'Sun Protection Hat', icon: 'mdi-hat-fedora', color: 'grey', upf: '30+' },
            { name: 'UV Sleeves', icon: 'mdi-arm-flex', color: 'blue', upf: '30+' }
          ]
          this.sportsWear = [
            { name: 'Professional Sports UV Shirt', icon: 'mdi-tshirt-crew', color: 'green', upf: '30+' },
            { name: 'Sports Sun Hat', icon: 'mdi-hat-fedora', color: 'green', upf: '30+' },
            { name: 'Sports Arm Sleeves', icon: 'mdi-arm-flex', color: 'green', upf: '30+' }
          ]
          this.beachWear = [
            { name: 'UV Protection Swimsuit Set', icon: 'mdi-swim', color: 'cyan', upf: '30+' },
            { name: 'Wide Brim Beach Hat', icon: 'mdi-hat-fedora', color: 'orange', upf: '30+' },
            { name: 'Beach Cover-up', icon: 'mdi-tshirt-crew', color: 'cyan', upf: '30+' }
          ]
          this.uvLevelTip = 'Moderate UV intensity. Please use UPF30+ professional sun protection clothing for better protection.'
          break
        case 'high':
          this.casualWear = [
            { name: 'UPF50+ Protection Jacket', icon: 'mdi-jacket', color: 'blue', upf: '50+' },
            { name: 'Face Cover Sun Hat', icon: 'mdi-hat-fedora', color: 'grey', upf: '50+' },
            { name: 'UV Protection Gloves', icon: 'mdi-hand-front-right', color: 'blue', upf: '40+' },
            { name: 'Neck Gaiter', icon: 'mdi-scarf', color: 'blue', upf: '50+' }
          ]
          this.sportsWear = [
            { name: 'Full Protection Sports Suit', icon: 'mdi-tshirt-crew', color: 'green', upf: '50+' },
            { name: 'Professional Sports Hat', icon: 'mdi-hat-fedora', color: 'green', upf: '50+' },
            { name: 'Sports UV Gloves', icon: 'mdi-hand-front-right', color: 'green', upf: '40+' }
          ]
          this.beachWear = [
            { name: 'Full Coverage Swimsuit', icon: 'mdi-swim', color: 'cyan', upf: '50+' },
            { name: 'Full Protection Beach Hat', icon: 'mdi-hat-fedora', color: 'orange', upf: '50+' },
            { name: 'Beach Protection Jacket', icon: 'mdi-jacket', color: 'cyan', upf: '50+' },
            { name: 'UV Protection Pants', icon: 'mdi-pants', color: 'cyan', upf: '50+' }
          ]
          this.uvLevelTip = 'High UV intensity. Full UPF50+ protection required. Please avoid outdoor activities during peak hours (10 AM - 4 PM).'
          break
        case 'extreme':
          this.casualWear = [
            { name: 'UPF50+ Full Body Suit', icon: 'mdi-hazard-lights', color: 'red', upf: '50+' },
            { name: 'Full Coverage Face Hat', icon: 'mdi-hat-fedora', color: 'red', upf: '50+' },
            { name: 'Professional UV Gloves', icon: 'mdi-hand-front-right', color: 'red', upf: '50+' },
            { name: 'Neck Protection', icon: 'mdi-scarf', color: 'red', upf: '50+' }
          ]
          this.sportsWear = [
            { name: 'Extreme Protection Sports Suit', icon: 'mdi-hazard-lights', color: 'red', upf: '50+' },
            { name: 'Full Coverage Sports Hat', icon: 'mdi-hat-fedora', color: 'red', upf: '50+' },
            { name: 'Professional Sports Gloves', icon: 'mdi-hand-front-right', color: 'red', upf: '50+' },
            { name: 'Sports Protection Pants', icon: 'mdi-pants', color: 'red', upf: '50+' }
          ]
          this.beachWear = [
            { name: 'Special UV Protection Swimsuit', icon: 'mdi-hazard-lights', color: 'red', upf: '50+' },
            { name: 'Full Protection Beach Hat', icon: 'mdi-hat-fedora', color: 'red', upf: '50+' },
            { name: 'Beach Protection Suit', icon: 'mdi-hazard-lights', color: 'red', upf: '50+' },
            { name: 'UV Protection Pants', icon: 'mdi-pants', color: 'red', upf: '50+' },
            { name: 'Protection Gloves', icon: 'mdi-hand-front-right', color: 'red', upf: '50+' }
          ]
          this.uvLevelTip = 'Extreme UV intensity. Please avoid outdoor activities. If outdoor activities are necessary, ensure full UPF50+ body protection.'
          break
      }
    }
  },
  mounted() {
    this.searchRecommendations()
  }
}
</script>

<style scoped>
.tips-card {
  height: 100%;
}
.search-section {
  max-width: 400px;
  margin: 0 auto;
}
</style> 