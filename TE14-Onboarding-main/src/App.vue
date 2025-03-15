<template>
  <v-app>
    <!-- 导航栏 -->
    <v-app-bar
      color="primary"
      density="comfortable"
    >
      <v-app-bar-title class="text-h5 font-weight-bold">
        SunShadow
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- 导航菜单 -->
      <template v-if="!$vuetify.display.mobile">
        <v-btn
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.path"
          :active="$route.path === item.path"
          variant="text"
          class="mx-1"
        >
          <v-icon :icon="item.icon" class="mr-1"></v-icon>
          <span class="text-body-2">{{ item.title }}</span>
        </v-btn>
      </template>

      <!-- 移动端菜单按钮 -->
      <template v-else>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <!-- 移动端侧边导航栏 -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.path"
          :active="$route.path === item.path"
          :prepend-icon="item.icon"
          @click="drawer = false"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 主要内容区域 -->
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- 页脚 -->
    <v-footer app color="primary" class="text-center d-flex flex-column">
      <div>
        SunShadow
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    return { route }
  },
  data() {
    return {
      drawer: false,
      navItems: [
        {
          title: 'UV Index',
          path: '/',
          icon: 'mdi-sun-wireless'
        },
        {
          title: 'Data',
          path: '/data',
          icon: 'mdi-chart-line'
        },
        {
          title: 'Personal',
          path: '/personal',
          icon: 'mdi-account'
        },
        {
          title: 'Reminder',
          path: '/reminder',
          icon: 'mdi-bell'
        },
        {
          title: 'Clothing',
          path: '/clothing',
          icon: 'mdi-hanger'
        }
      ]
    }
  }
}
</script>

<style>
.v-application {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.v-btn {
  text-transform: none !important;
}

.v-app-bar-title {
  width: auto !important;
}

.text-caption {
  line-height: 1.2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
