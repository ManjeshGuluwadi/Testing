<template>
  <v-card class="reminder-card">
    <v-card-title>Sunscreen Reminder Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="saveSettings">
        <v-switch
          v-model="settings.enabled"
          label="Enable UV Protection Reminders"
          color="primary"
          @change="handleEnableChange"
        ></v-switch>

        <template v-if="settings.enabled">
          <v-card-subtitle class="px-0 pt-4">Reminder Times</v-card-subtitle>
          <v-chip-group
            v-model="settings.reminderTimes"
            multiple
            column
          >
            <v-chip
              v-for="hour in availableHours"
              :key="hour.value"
              :value="hour.value"
              filter
              variant="outlined"
            >
              {{ hour.label }}
            </v-chip>
          </v-chip-group>

          <v-checkbox
            v-model="settings.uvBased"
            label="Adjust reminders based on UV index"
            hint="Increase reminder frequency when UV index is high"
            persistent-hint
          ></v-checkbox>
        </template>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-4"
          :loading="saving"
        >
          Save Settings
        </v-btn>
      </v-form>
    </v-card-text>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { notificationService } from '@/services/notificationService'

export default {
  name: 'ReminderSettings',
  data() {
    return {
      settings: {
        enabled: false,
        reminderTimes: [],
        uvBased: true
      },
      saving: false,
      availableHours: [
        { label: '7:00 AM', value: 7 },
        { label: '9:00 AM', value: 9 },
        { label: '11:00 AM', value: 11 },
        { label: '1:00 PM', value: 13 },
        { label: '3:00 PM', value: 15 },
        { label: '5:00 PM', value: 17 },
        { label: '7:00 PM', value: 19 }
      ],
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  methods: {
    async handleEnableChange(enabled) {
      if (enabled) {
        try {
          const hasPermission = await notificationService.checkNotificationPermission();
          if (!hasPermission) {
            this.settings.enabled = false;
            this.showMessage('Please enable notifications in your browser settings', 'error');
          }
        } catch (error) {
          this.settings.enabled = false;
          this.showMessage('Your browser does not support notifications', 'error');
        }
      }
    },
    async saveSettings() {
      if (!this.settings.enabled || this.settings.reminderTimes.length === 0) {
        this.showMessage('Please select at least one reminder time', 'error');
        return;
      }

      this.saving = true;
      try {
        notificationService.saveReminderSettings(this.settings);
        notificationService.startPeriodicCheck();
        this.showMessage('Reminder settings saved successfully', 'success');
      } catch (error) {
        console.error('Failed to save reminder settings:', error);
        this.showMessage('Failed to save settings, please try again', 'error');
      } finally {
        this.saving = false;
      }
    },
    loadSettings() {
      try {
        const savedSettings = notificationService.getReminderSettings();
        if (savedSettings) {
          this.settings = {
            ...this.settings,
            ...savedSettings
          };
        }
      } catch (error) {
        console.error('Failed to load reminder settings:', error);
        this.showMessage('Failed to load settings, please refresh the page', 'error');
      }
    },
    showMessage(text, color) {
      this.snackbar = {
        show: true,
        text,
        color
      };
    }
  },
  mounted() {
    this.loadSettings();
  }
}
</script>

<style scoped>
.reminder-card {
  max-width: 800px;
  margin: 0 auto;
}
</style> 