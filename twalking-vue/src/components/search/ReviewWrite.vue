<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();
const props = defineProps({ placeId: String });

// const value = ref('');
// const rating = ref(0.0);
const param = ref({
  title: '',
  content: '',
  score: 0.0,
  attractionId: parseInt(props.placeId)
});

const rules = {
  titleLength: (v) => v.length <= 25 || 'Max 20 characters',
  contentLength: (v) => v.length <= 100 || 'Max 200 characters',
  required: (v) => !!v || 'Required.',
  minLength: (v) => (v && v.length >= 3) || 'Min 2 characters'
};

const write = async () => {
  console.log(param.value);
  await userStore.writeReview(
    param.value,
    (response) => {
    console.log(response)
    },
    (err) => {
      console.log(err);
    }
  );
};
</script>

<template>
  <v-card class="pa-8">
    <v-card-title class="mb-6">✏️리뷰 작성</v-card-title>
    <v-text-field
      class="mb-2"
      label="제목(20자 이내)"
      variant="outlined"
      :rules="[rules.titleLength, rules.required, rules.minLength]"
      v-model="param.title"
      counter
    ></v-text-field>
    <v-textarea
      class="mb-2"
      label="내용(200자 이내)"
      variant="outlined"
      rows="3"
      :rules="[rules.contentLength, rules.required, rules.minLength]"
      v-model="param.content"
      auto-grow
      counter
    ></v-textarea>
    <div class="d-flex">
      <v-rating
        v-model="param.score"
        color="amber"
        density="compact"
        size="medium"
        hover
        half-increments
      ></v-rating>
      <pre> {{ param.score }}점 줄래요!</pre>
    </div>
    <v-card-actions>
      <v-btn class="mt-6" color="blue-darken-1" variant="tonal" @click="write">
        등록하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
