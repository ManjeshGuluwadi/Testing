<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">Personalized Sunscreen Recommendations</h1>
      </v-col>

      <!-- Calculation Form -->
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="calculateAmount">
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
                class="mt-4"
              ></v-select>

              <v-btn
                color="primary"
                block
                class="mt-6"
                @click="calculateAmount"
                :disabled="!uvIndex || !skinType"
              >
                Calculate Sunscreen Amount
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Calculation Results -->
      <v-col cols="12" md="6" class="mx-auto" v-if="showResult">
        <v-card>
          <v-card-title class="text-h5">Recommended Amount</v-card-title>
          <v-card-text class="text-center py-4">
            <v-scale-transition>
              <div class="result-container">
                <div class="spoon-animation">
                  <v-icon size="64" color="amber">mdi-spoon-sugar</v-icon>
                  <div class="amount-bubble">
                    <span class="text-h3">{{ recommendedAmount }}</span>
                    <span class="text-caption">teaspoons</span>
                  </div>
                </div>
                <div class="text-body-1 mt-4">{{ recommendationText }}</div>
              </div>
            </v-scale-transition>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Body Parts Distribution -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Body Parts Distribution
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(part, index) in bodyParts" :key="index" cols="12" sm="6" md="4">
                <v-card variant="outlined">
                  <v-card-title>
                    {{ part.nameEn }}
                  </v-card-title>
                  <v-card-text class="text-center">
                    <div class="text-h4 mb-2">{{ part.amount }}</div>
                    <div class="text-body-2">teaspoons</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Instructions -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Instructions
          </v-card-title>
          <v-card-text>
            <v-timeline density="compact">
              <v-timeline-item
                v-for="(instruction, index) in instructions"
                :key="index"
                :dot-color="instruction.color"
                size="small"
              >
                <div class="mb-2">
                  <strong>{{ instruction.titleEn }}</strong>
                </div>
                <div>
                  {{ instruction.contentEn }}
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PersonalView',
  data() {
    return {
      uvIndex: null,
      uvIndexRanges: [
        { text: 'UV Index 1.0-3 (Low)', value: 'low' },
        { text: 'UV Index 3-6 (Medium)', value: 'medium' },
        { text: 'UV Index 6-9 (High)', value: 'high' },
        { text: 'UV Index 9+ (Extreme)', value: 'extreme' }
      ],
      skinType: null,
      skinTypes: [
        { text: 'Oily Skin', value: 'oily' },
        { text: 'Dry Skin', value: 'dry' },
        { text: 'Normal Skin', value: 'normal' },
        { text: 'Combination Skin', value: 'combination' }
      ],
      showResult: false,
      recommendedAmount: '',
      recommendationText: '',
      bodyParts: [
        { 
          nameEn: 'Face and Neck',
          amount: '1'
        },
        {
          nameEn: 'Each Arm',
          amount: '1'
        },
        {
          nameEn: 'Chest and Abdomen',
          amount: '2'
        },
        {
          nameEn: 'Back',
          amount: '2'
        },
        {
          nameEn: 'Each Leg',
          amount: '2'
        }
      ],
      instructions: [
        {
          titleEn: 'Application Time',
          contentEn: 'Apply sunscreen 20-30 minutes before going out',
          color: 'primary'
        },
        {
          titleEn: 'Application Method',
          contentEn: 'Apply evenly, don\'t miss areas exposed to sun',
          color: 'info'
        },
        {
          titleEn: 'Reapplication',
          contentEn: 'Reapply every 2 hours or after swimming/sweating',
          color: 'warning'
        }
      ]
    }
  },
  methods: {
    calculateAmount() {
      if (!this.uvIndex || !this.skinType) return

      // Base amount (in teaspoons)
      let baseAmount = 2

      // Adjust based on UV index
      const uvAdjustment = {
        low: 0,
        medium: 0.5,
        high: 1,
        extreme: 1.5
      }
      baseAmount += uvAdjustment[this.uvIndex]

      // Adjust based on skin type
      const skinTypeAdjustment = {
        oily: -0.5,    // Slightly reduce amount for oily skin
        dry: 0.5,      // Increase amount for dry skin
        normal: 0,     // Standard amount for normal skin
        combination: 0  // Standard amount for combination skin
      }
      baseAmount += skinTypeAdjustment[this.skinType]

      // Set result
      this.recommendedAmount = baseAmount.toFixed(1)
      
      // Set recommendation text
      const skinTypeText = {
        oily: 'Please choose a light, non-greasy sunscreen or spray',
        dry: 'Recommended to use moisturizing sunscreen',
        normal: 'Regular sunscreen is suitable',
        combination: 'Use light sunscreen for T-zone, moisturizing for cheeks'
      }
      this.recommendationText = skinTypeText[this.skinType]
      
      this.showResult = true
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

.text-grey {
  color: rgba(0, 0, 0, 0.6);
}

.result-container {
  animation: fadeIn 0.5s ease-out;
}

.spoon-animation {
  position: relative;
  display: inline-block;
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.amount-bubble {
  position: absolute;
  top: -20px;
  right: -80px;
  background: rgba(255, 193, 7, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 0.5s ease-out 0.3s both;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 