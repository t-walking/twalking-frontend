<script setup>
import { ref } from 'vue';

const icons = ref([
  'mdi-github',
  'mdi-facebook',
  'mdi-twitter',
  'mdi-instagram'
]);
</script>

<template>
  <v-footer
    class="footer text-grey-darken-4 text-center d-flex flex-column mb-2"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris
      cursus commodo interdum.
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Vuetify</strong></div>
  </v-footer>
</template>

<style>
.footer {
  font-family: 'pretendard-extraLight';
}
</style>
