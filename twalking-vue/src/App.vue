<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from '@/components/layout/NavigationBar.vue';
import PageFooter from './components/layout/PageFooter.vue';
</script>

<template>
  <v-app id="inspire">
    <header>
      <NavigationBar />
    </header>
    <v-main>
      <RouterView />
    </v-main>
    <footer>
      <PageFooter />
    </footer>
  </v-app>
</template>

<style scoped>
@font-face {
  font-family: 'pretendard-extraLight';
  src: url('src/assets/fonts/Pretendard-ExtraLight.otf') format('truetype');
}

@font-face {
  font-family: 'pretendard-light';
  src: url('src/assets/fonts/Pretendard-Light.otf') format('truetype');
}

@font-face {
  font-family: 'pretendard-regular';
  src: url('src/assets/fonts/Pretendard-Regular.otf') format('truetype');
}

@font-face {
  font-family: 'pretendard-bold';
  src: url('src/assets/fonts/Pretendard-Bold.otf') format('truetype');
}

@font-face {
  font-family: 'pretendard-extraBold';
  src: url('src/assets/fonts/Pretendard-ExtraBold.otf') format('truetype');
}
</style>
