<script setup>
import { ref, shallowRef } from 'vue';
import { listReview } from '@/api/review';
import ReviewWrite from '@/components/search/ReviewWrite.vue';

let reviews = ref([]);
let dialog2 = ref(false);
let writing = ref(false);
const search = shallowRef('');
defineProps({ place: Object });

const showReviewList = (placeId) => {
  if (!dialog2.value) {
    showReview(placeId);
  }
  if (writing.value) {
    writing.value = !writing.value;
  }
  dialog2.value = !dialog2.value;
};

const showReview = (placeId) => {
  listReview(
    { attractionId: placeId },
    ({ data }) => {
      reviews.value = data.reviews;
    },
    (err) => {
      console.log(err);
    }
  );
};

const showReviewWrite = () => {
  writing.value = !writing.value;
};
</script>

<template>
  <v-card class="mx-auto py-8" max-width="560">
    <v-spacer></v-spacer>
    <v-img height="250" :src="place.raw.img" cover></v-img>
    <v-card-item>
      <v-card-title>{{ place.raw.name }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">Local Favorite</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="place.raw.reviewScore"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>
        <div class="text-grey ms-4">
          {{ place.raw.reviewScore }} ({{ place.raw.reviewCount }} )
        </div>
      </v-row>
      <div class="mt-4 mb-2 text-subtitle-1">📍 {{ place.raw.address }}</div>
      <div>
        {{ place.raw.overview }}
      </div>
    </v-card-text>
    <v-divider class="mx-4 mb-1"></v-divider>
    <div
      class="mx-4 text-subtitle-1 text-decoration-underline"
      @click="showReviewList(place.raw.id)"
    >
      🏃뚜벅이들의 리뷰 보기🏃
    </div>
    <v-dialog v-model="dialog2" width="80%">
      <v-card v-if="!writing">
        <v-data-iterator :items="reviews" :items-per-page="3" :search="search">
          <template v-slot:header>
            <v-toolbar class="px-2" color="white">
              <v-text-field
                v-model="search"
                clearable
                hide-details
                placeholder="키워드로 리뷰 검색!"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:default="{ items: reviews }">
            <template v-for="(review, i) in reviews" :key="i">
              <v-card class="card mb-2 pa-1" variant="tonal">
                <div>
                  <v-card-title class="text-h5">{{
                    review.raw.title
                  }}</v-card-title>
                  <v-card-subtitle>{{ review.raw.nickname }}</v-card-subtitle>
                  <v-row align="center" class="mx-3 my-0">
                    <v-rating
                      :model-value="review.raw.score"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      size="small"
                    ></v-rating>
                    <div class="text-grey ms-4">
                      {{ review.raw.score }}
                    </div>
                  </v-row>
                  <v-card-text>{{ review.raw.content }}</v-card-text>
                </div>
              </v-card>
            </template>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                icon="mdi-chevron-left"
                density="comfortable"
                variant="tonal"
                rounded
                @click="prevPage"
              ></v-btn>
              <div class="mx-2 text-caption">
                Page {{ page }} of {{ pageCount }}
              </div>
              <v-btn
                :disabled="page >= pageCount"
                icon="mdi-chevron-right"
                density="comfortable"
                variant="tonal"
                rounded
                @click="nextPage"
              ></v-btn>
            </div>
          </template>
        </v-data-iterator>
        <v-card-actions>
          <v-btn
            color="deep-purple-lighten-2"
            variant="text"
            @click="showReviewWrite"
          >
            나도 리뷰 쓰기
          </v-btn>
        </v-card-actions>
      </v-card>
      <ReviewWrite v-if="writing" :placeId="place.raw.id" />
    </v-dialog>
  </v-card>
</template>

<style scoped></style>
