<script setup>
import { ref, shallowRef, watch } from 'vue';
import CardInfo from '@/components/search/CardInfo.vue';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();

const emit = defineEmits(['viewPlace']);
const onSelect = (item, i) => {
  openDialog(i);
  emit('viewPlace', item);
};

let items = [];
const search = shallowRef('');
const props = defineProps({ places: Array });

const isLiked = ref([]);
const toggleLike = async (placeId, index) => {
  if (!isLiked.value[index]) {
    await userStore.addLike(
      { attractionId: parseInt(placeId) },
      (response) => {
        console.log(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    await userStore.removeLike(
      { attractionId: parseInt(placeId) },
      (response) => {
        console.log(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  isLiked.value[index] = !isLiked.value[index];
};

const dialog = ref([]);
const openDialog = (index) => {
  dialog.value[index] = true;
};

watch(
  () => props.places.value,
  () => {
    items = props.places.map((item) => ({
      id: item.id,
      name: item.title,
      address: item.addr1,
      img: item.firstImage,
      thumbnail: item.firstImage2,
      overview: item.overview,
      reviewCount: item.reviewCount,
      reviewScore: item.reviewScore,
      latitude: item.latitude,
      longitude: item.longitude
    }));
  },
  { deep: true }
);
</script>

<template>
  <v-data-iterator :items="items" :items-per-page="4" :search="search">
    <template v-slot:header>
      <v-toolbar class="mb-3" color="grey-lighten-4">
        <v-text-field
          v-model="search"
          clearable
          hide-details
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:default="{ items }">
      <template v-for="(item, i) in items" :key="i">
        <v-card
          class="card mb-3 rounded-lg"
          height="6.5rem"
          density="compact"
          @click="onSelect(item)"
          link
        >
          <div class="d-flex justify-space-between">
            <v-card-item width="1rem">
              <v-card-title
                class="my-1"
                style="font-family: pretendard-bold; font-size: large"
                @click="openDialog(i)"
              >
                {{ item.raw.name }}
                <v-dialog v-model="dialog[i]" width="auto">
                  <v-card>
                    <CardInfo :place="item" />
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-card-subtitle class="mb-1">{{
                item.raw.address
              }}</v-card-subtitle>
              <v-btn
                variant="text"
                density="compact"
                :icon="isLiked[i] ? 'mdi-heart' : 'mdi-heart-outline'"
                :color="isLiked[i] ? 'red' : 'grey-lighten-1'"
                @click="toggleLike(item.raw.id, i)"
              >
              </v-btn>
            </v-card-item>
            <v-avatar class="rounded-lg">
              <v-img :src="item.raw.thumbnail" cover></v-img>
            </v-avatar>
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
        <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>
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
</template>

<style></style>
