<template>
  <div>
    <div class="carousel-container">
      <v-carousel
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-square"
        style="height: 84vh"
        light
        cycle
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img
            :src="homeCovers[i].src"
            height="100%"
            :style="homeCovers[i].brightness"
            cover
          >
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="text-container">
      <h1 class="ml4 text-center">
        <span class="letters letters-1">뚜벅이 여행자라면</span>
        <span class="letters letters-2">Let's</span>
        <span class="letters letters-3">Twalking!</span>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import anime from 'https://cdn.skypack.dev/animejs';

var ml4 = {};
ml4.opacityIn = [0, 1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

const homeCovers = ref([
  {
    src: 'src/assets/imags/home_img1.jpg',
    brightness: 'filter: brightness(60%)'
  },
  {
    src: 'src/assets/imags/home_img2.jpg',
    brightness: 'filter: brightness(60%)'
  },
  {
    src: 'src/assets/imags/home_img3.jpg',
    brightness: 'filter: brightness(40%)'
  },
  {
    src: 'src/assets/imags/home_img4.jpg',
    brightness: 'filter: brightness(50%)'
  }
]);

const slides = ref(['First', 'Second', 'Third', 'Fourth']);

onMounted(() => {
  anime
    .timeline({ loop: true })
    .add({
      targets: '.ml4 .letters-1',
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationIn
    })
    .add({
      targets: '.ml4 .letters-1',
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: 'easeInExpo',
      delay: ml4.delay
    })
    .add({
      targets: '.ml4 .letters-2',
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationIn
    })
    .add({
      targets: '.ml4 .letters-2',
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: 'easeInExpo',
      delay: ml4.delay
    })
    .add({
      targets: '.ml4 .letters-3',
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationIn
    })
    .add({
      targets: '.ml4 .letters-3',
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: 'easeInExpo',
      delay: ml4.delay
    })
    .add({
      targets: '.ml4',
      opacity: 0,
      duration: 500,
      delay: 500
    });
});
</script>

<style>
.v-carousel .v-btn .v-btn__content .v-icon {
  color: rgb(240, 240, 240);
}

.carousel-container {
  position: relative;
}

.text-container {
  position: absolute;
  top: -10%;
  /* left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 2; /* Ensure that the text is on top of the carousel */
}

.ml4 {
  position: relative;
  font-family: pretendard-extraBold;
  font-weight: 900;
  font-size: 8em;
}
.ml4 .letters {
  color: white;
  width: 88vmax;
  position: absolute;
  top: 36vmin;
  left: 5vmax;
  opacity: 0;
}
</style>
