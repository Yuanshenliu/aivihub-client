<script setup lang="ts">
defineOptions({ name: 'appLayout' })
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar/index.vue'
</script>

<template>
  <div class="flex h-full w-full bg-regular">
    <Sidebar></Sidebar>

    <div class="h-full w-full">
      <Navbar></Navbar>

      <div class="app-main-wrap w-full">
        <scrollbar>
          <transition name="fade">
            <router-view v-slot="{ Component }">
              <keep-alive :exclude="[]">
                <component :is="Component"></component>
              </keep-alive>
            </router-view>
          </transition>
        </scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module';

.app-main-wrap {
  height: calc(100vh - #{$navbarHeight});
}
</style>
