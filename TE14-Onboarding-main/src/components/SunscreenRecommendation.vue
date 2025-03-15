<template>
  <v-card class="recommendation-card">
    <v-card-title>Personalized Sunscreen Recommendation</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleCalculate">
        <v-select
          v-model="uvIndex"
          :items="uvIndexRanges"
          item-title="text"
          item-value="value"
          label="Select UV Index Range"
          required
        ></v-select>

        <v-select
          v-model="skinType"
          :items="skinTypes"
          item-title="text"
          item-value="value"
          label="Select Skin Type"
          required
        ></v-select>

        <v-btn
          color="primary"
          block
          class="mt-4"
          @click="handleCalculate"
          :disabled="!uvIndex || !skinType"
        >
          Get Recommendation
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SunscreenRecommendation',
  data() {
    return {
      uvIndex: '',
      uvIndexRanges: [
        { text: 'UV Index 1.0-3.0 (Low)', value: 'low' },
        { text: 'UV Index 3.0-6.0 (Moderate)', value: 'moderate' },
        { text: 'UV Index 6.0-9.0 (High)', value: 'high' },
        { text: 'UV Index 9.0+ (Extreme)', value: 'extreme' }
      ],
      skinType: '',
      skinTypes: [
        { text: 'Oily Skin', value: 'oily' },
        { text: 'Dry Skin', value: 'dry' },
        { text: 'Normal Skin', value: 'normal' },
        { text: 'Combination Skin', value: 'combination' }
      ]
    }
  },
  methods: {
    handleCalculate() {
      if (!this.uvIndex || !this.skinType) return
      this.$emit('calculate', {
        uvIndex: this.uvIndex,
        skinType: this.skinType
      })
    }
  }
}
</script>

<style scoped>
.recommendation-card {
  height: 100%;
  min-height: 300px;
}
</style> 