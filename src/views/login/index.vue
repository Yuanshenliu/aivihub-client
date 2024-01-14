<script setup lang="ts">
import QRCodeLogin from './components/QRCodeLogin.vue'
import UsernameAndPasswordLogin from './components/UsernameAndPasswordLogin.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

defineOptions({
  name: 'LoginPage'
})

const miniWindow = () => {
  window.electron.send('mini-window')
}

const closeWindow = () => {
  window.electron.send('close-window')
}
</script>

<template>
  <div class="relative flex h-full w-full bg-dialog">
    <div class="drag absolute top-0 flex h-14 w-full justify-between pl-3 pr-5">
      <div class="no-drag flex items-center" @click="toggleDark()">
        <div
          class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-lg text-white"
        >
          <svg-icon name="logo"></svg-icon>
        </div>

        <span class="ml-3 text-xl text-regular">a i i vi hub</span>
      </div>
      <div class="flex h-full w-fit items-center">
        <div class="no-drag opt-icon mr-2" @click="miniWindow">
          <svg-icon name="mini"></svg-icon>
        </div>

        <div class="no-drag opt-icon text-secondary" @click="closeWindow">
          <svg-icon name="close"></svg-icon>
        </div>
      </div>
    </div>

    <div class="mt-5 flex h-full w-full flex-1 px-5 pt-14">
      <div class="ffc relative h-full w-[35%]">
        <QRCodeLogin />

        <div
          class="absolute right-0 top-10 h-[200px] w-[1px] bg-gray-200 dark:bg-[#424242FF]"
        ></div>
      </div>

      <div class="h-full w-[65%] px-14">
        <UsernameAndPasswordLogin />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
