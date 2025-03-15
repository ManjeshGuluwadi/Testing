// Check if browser supports notifications
const checkNotificationPermission = async () => {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support desktop notifications');
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

// Save reminder settings to Cookie
const saveReminderSettings = (settings) => {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1); // Cookie expires in 1 month
  document.cookie = `uvReminders=${JSON.stringify(settings)};expires=${expiryDate.toUTCString()};path=/`;
};

// Get reminder settings from Cookie
const getReminderSettings = () => {
  const cookies = document.cookie.split(';');
  const reminderCookie = cookies.find(cookie => cookie.trim().startsWith('uvReminders='));
  if (reminderCookie) {
    try {
      return JSON.parse(reminderCookie.split('=')[1]);
    } catch (e) {
      console.error('Failed to parse reminder settings:', e);
      return null;
    }
  }
  return null;
};

// Send browser notification
const sendNotification = async (title, options = {}) => {
  try {
    const hasPermission = await checkNotificationPermission();
    if (!hasPermission) {
      throw new Error('Notification permission not granted');
    }

    return new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
    return null;
  }
};

// Start periodic check
const startPeriodicCheck = () => {
  // Check every hour
  setInterval(() => {
    const currentHour = new Date().getHours();
    const settings = getReminderSettings();
    
    if (settings && settings.enabled && settings.reminderTimes.includes(currentHour)) {
      // Get last notification time
      const lastNotificationTime = localStorage.getItem('lastNotificationTime');
      const now = new Date();
      
      // If no notification has been sent in this hour
      if (!lastNotificationTime || new Date(lastNotificationTime).getHours() !== currentHour) {
        const messages = [
          'Morning UV protection time! Start your day with proper sun protection.',
          'Afternoon UV peak time! Check and reapply your sunscreen.',
          'Evening UV check! Make sure you are still protected.',
        ];
        
        const timeIndex = settings.reminderTimes.indexOf(currentHour);
        sendNotification('Sunscreen Reminder', {
          body: messages[timeIndex],
          requireInteraction: true,
          silent: false
        });
        
        // Record notification time
        localStorage.setItem('lastNotificationTime', now.toISOString());
      }
    }
  }, 60 * 1000); // Check every minute
};

export const notificationService = {
  checkNotificationPermission,
  saveReminderSettings,
  getReminderSettings,
  sendNotification,
  startPeriodicCheck
}; 