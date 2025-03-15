<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">
          Sunscreen Reminder Settings
        </h1>
      </v-col>

      <!-- Reminder Settings Form -->
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="reminder-card">
          <v-card-text class="text-center py-6">
            <div class="reminder-switch-container mb-6">
              <v-switch
                v-model="enableReminders"
                color="primary"
                hide-details
                @change="handleReminderToggle"
                class="reminder-switch"
              >
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <v-icon
                      :color="enableReminders ? 'primary' : 'grey'"
                      class="mr-2"
                      size="24"
                    >
                      {{ enableReminders ? 'mdi-bell' : 'mdi-bell-off' }}
                    </v-icon>
                    <span class="text-h6">{{ enableReminders ? 'Reminders Enabled' : 'Reminders Disabled' }}</span>
                  </div>
                </template>
              </v-switch>
            </div>

            <v-expand-transition>
              <div v-if="enableReminders">
                <v-divider class="mb-6"></v-divider>
                
                <!-- Fixed Reminder Times -->
                <div class="reminder-times">
                  <h3 class="text-h6 mb-4">
                    Daily Reminder Times
                  </h3>

                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-card
                        class="time-card"
                        variant="outlined"
                        :color="enableReminders ? 'warning' : 'grey-lighten-1'"
                      >
                        <v-card-text class="text-center py-4">
                          <v-icon
                            :color="enableReminders ? 'warning' : 'grey'"
                            size="36"
                            class="mb-2"
                          >
                            mdi-weather-sunny
                          </v-icon>
                          <div class="text-h5 mb-1">10:00 AM</div>
                          <div class="text-body-2 text-grey">Morning UV Protection</div>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-card
                        class="time-card"
                        variant="outlined"
                        :color="enableReminders ? 'error' : 'grey-lighten-1'"
                      >
                        <v-card-text class="text-center py-4">
                          <v-icon
                            :color="enableReminders ? 'error' : 'grey'"
                            size="36"
                            class="mb-2"
                          >
                            mdi-weather-sunny
                          </v-icon>
                          <div class="text-h5 mb-1">2:00 PM</div>
                          <div class="text-body-2 text-grey">Afternoon UV Peak Time</div>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-card
                        class="time-card"
                        variant="outlined"
                        :color="enableReminders ? 'error' : 'grey-lighten-1'"
                      >
                        <v-card-text class="text-center py-4">
                          <v-icon
                            :color="enableReminders ? 'error' : 'grey'"
                            size="36"
                            class="mb-2"
                          >
                            mdi-weather-sunny
                          </v-icon>
                          <div class="text-h5 mb-1">6:00 PM</div>
                          <div class="text-body-2 text-grey">Evening UV Check</div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-expand-transition>

            <v-card-actions class="justify-center mt-6">
              <v-btn
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!enableReminders"
                @click="saveSettings"
                class="px-8"
                rounded="pill"
              >
                <v-icon left class="mr-2">mdi-content-save</v-icon>
                Save Settings
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Reminder Information -->
      <v-col cols="12" md="8" class="mx-auto mt-6">
        <v-card class="info-card">
          <v-card-title class="d-flex align-center">
            <v-icon color="info" size="24" class="mr-2">mdi-information-outline</v-icon>
            Reminder Service Information
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="warning">mdi-weather-sunny</v-icon>
                </template>
                <v-list-item-title>
                  Morning UV Protection
                </v-list-item-title>
                <v-list-item-subtitle>
                  10:00 AM, Start your day with proper sun protection
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="error">mdi-weather-sunny</v-icon>
                </template>
                <v-list-item-title>
                  Afternoon UV Peak Time
                </v-list-item-title>
                <v-list-item-subtitle>
                  2:00 PM, Check and reapply your sunscreen
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="error">mdi-weather-sunny</v-icon>
                </template>
                <v-list-item-title>
                  Evening UV Check
                </v-list-item-title>
                <v-list-item-subtitle>
                  6:00 PM, Make sure you are still protected
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="info">mdi-bell-outline</v-icon>
                </template>
                <v-list-item-title>
                  Reminder Method
                </v-list-item-title>
                <v-list-item-subtitle>
                  Browser Desktop Notifications
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Message Tips -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

// Cookie utility functions
const setCookie = (name, value, days = 365) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${JSON.stringify(value)};${expires};path=/`;
    return true;
  } catch (error) {
    console.error('Failed to set cookie:', error);
    return false;
  }
};

const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(cookieName) === 0) {
      try {
        return JSON.parse(cookie.substring(cookieName.length));
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export default {
  name: 'ReminderView',
  setup() {
    const form = ref(null);
    const enableReminders = ref(false);
    const loading = ref(false);
    const snackbar = ref({
      show: false,
      text: '',
      color: 'success'
    });
    let reminderTimers = [];

    // 固定提醒时间（24小时制）
    const reminderTimes = [
      { hour: 10, minute: 0 },  // 10:00 上午
      { hour: 14, minute: 0 },  // 14:00 下午
      { hour: 18, minute: 0 },  // 18:00 傍晚
    ];

    // 请求通知权限
    const requestNotificationPermission = async () => {
      if (!('Notification' in window)) {
        showSnackbar('Your browser does not support notifications', 'error');
        return false;
      }

      if (Notification.permission === 'granted') {
        return true;
      }

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }

      return false;
    };

    // 发送防晒提醒
    const sendReminder = (timeIndex) => {
      if (Notification.permission === 'granted') {
        const messages = [
          'Morning UV protection time! Start your day with proper sun protection.',
          'Noon UV peak time! Check and reapply your sunscreen.',
          'Afternoon UV protection check! Make sure you are still protected.',
        ];
        
        const notification = new Notification('Sunscreen Reminder', {
          body: messages[timeIndex],
          icon: '/favicon.ico'
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    };

    // 设置定时提醒
    const scheduleReminders = () => {
      // 清除现有的定时器
      reminderTimers.forEach(timer => clearTimeout(timer));
      reminderTimers = [];

      if (!enableReminders.value) return;

      const now = new Date();
      reminderTimes.forEach((time, index) => {
        const reminderTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          time.hour,
          time.minute
        );

        // 如果今天的提醒时间已过，设置为明天
        if (reminderTime < now) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const delay = reminderTime.getTime() - now.getTime();
        const timer = setTimeout(() => {
          sendReminder(index);
          // 设置下一天的同一时间提醒
          scheduleReminders();
        }, delay);

        reminderTimers.push(timer);
      });
    };

    // 处理提醒开关变化
    const handleReminderToggle = async () => {
      if (enableReminders.value) {
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) {
          enableReminders.value = false;
          showSnackbar('Please allow notification permissions to receive reminders', 'error');
        } else {
          scheduleReminders();
        }
      } else {
        reminderTimers.forEach(timer => clearTimeout(timer));
        reminderTimers = [];
      }
    };

    // 加载用户设置
    const loadUserSettings = () => {
      try {
        const settings = getCookie('reminderSettings');
        if (settings) {
          enableReminders.value = settings.reminderEnabled || false;
          if (enableReminders.value) {
            scheduleReminders();
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        showSnackbar('Failed to load settings, please try again later', 'error');
      }
    };

    // 保存设置
    const saveSettings = async () => {
      try {
        loading.value = true;
        
        // 保存到cookie
        const settings = {
          reminderEnabled: enableReminders.value,
          updatedAt: new Date().toISOString()
        };
        
        const saved = setCookie('reminderSettings', settings);
        if (saved) {
          scheduleReminders();
          showSnackbar('Settings saved, reminders updated', 'success');
        } else {
          throw new Error('Failed to save settings');
        }
      } catch (error) {
        console.error('Failed to save settings:', error);
        showSnackbar('Failed to save settings, please check if browser cookie settings are enabled', 'error');
      } finally {
        loading.value = false;
      }
    };

    const showSnackbar = (text, color = 'success') => {
      snackbar.value.text = text;
      snackbar.value.color = color;
      snackbar.value.show = true;
    };

    // 组件挂载时加载设置
    onMounted(() => {
      loadUserSettings();
    });

    // 组件卸载时清理定时器
    onUnmounted(() => {
      reminderTimers.forEach(timer => clearTimeout(timer));
    });

    return {
      form,
      enableReminders,
      loading,
      snackbar,
      handleReminderToggle,
      saveSettings
    };
  }
};
</script>

<style scoped>
.reminder-card {
  border-radius: 16px;
  overflow: hidden;
}

.reminder-switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reminder-switch {
  transform: scale(1.2);
}

.time-card {
  transition: all 0.3s ease;
  height: 100%;
}

.time-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-list-item {
  transition: background-color 0.3s ease;
  border-radius: 8px;
  margin-bottom: 4px;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.reminder-times {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 