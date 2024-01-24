<script setup lang="ts">
import NavSearch from './NavSearch.vue'

defineOptions({ name: 'navbarComp' })

const fullWin = ref<boolean>()
const appStore = useAppStore()

window.electron.on<boolean>('window-max-size', (full) => {
  fullWin.value = full
})

const miniWindow = () => {
  window.electron.send('mini-window')
}

const closeWindow = () => {
  window.electron.send('close-window')
}

const maxWindow = () => {
  window.electron.send('set-full-window', true)
}

const restoreWindow = () => {
  window.electron.send('set-full-window', false)
}
</script>

<template>
  <div class="navbar-wrap drag relative w-full flex-shrink-0 border-t1 bg-regular">
    <div class="logo-wrap flex items-center pl-6">
      <div class="title pt-2 text-primary"><span>aiivi</span><span class="ml-1">hub</span></div>

      <transition>
        <div class="ml-7" id="header-wrapper" v-show="appStore.showNavTab"></div>
      </transition>
    </div>

    <NavSearch v-model:force="appStore.searching"></NavSearch>

    <div class="operator-wrap flex items-center pr-5">
      <div class="no-drag opt-icon mr-5" @click="miniWindow">
        <svg-icon name="mini" style="font-size: 16px"></svg-icon>
      </div>

      <div class="no-drag opt-icon mr-5" @click="fullWin ? restoreWindow() : maxWindow()">
        <svg-icon name="restore" style="font-size: 16px" v-if="fullWin"></svg-icon>
        <svg-icon name="max" style="font-size: 16px" v-else></svg-icon>
      </div>

      <div class="no-drag opt-icon" @click="closeWindow">
        <svg-icon name="close" style="font-size: 16px"></svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.module';
@import '@/styles/index';

.navbar-wrap {
  @apply flex items-center justify-between;
  height: $navbarHeight;
  border-bottom: 1px solid var(--tw-border-t1);

  .title {
    span {
      font-family: HanyiSentyPailouArch, serif;
      font-size: 31px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
