<script setup>
import Sortable from 'https://cdn.skypack.dev/sortablejs@1.15.0';
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user-store';

const userStore = useUserStore();

let likeList = [];
let resultList = ref([]);
let likeItems = ref([]);
const likeElRef = ref(null);
const disElRef = ref(null);
const dialog = ref(false);

onMounted(() => {
  userStore.listLike(
    ({ data }) => {
      data.attractions.forEach((place) => {
        likeItems.value.push({
          name: place.title,
          address: place.addr1,
          id: parseInt(place.id)
        });
      });
    },
    (err) => {
      console.log(err);
    }
  );

  initializeSortable();
});

const initializeSortable = () => {
  const likeEl = likeElRef.value;
  const disEl = disElRef.value;

  new Sortable(likeEl, {
    animation: 150,
    group: 'shared',

    onEnd: (event) => {
      const temp = [];
      Object.values(event.from.children).forEach((item) => {
        temp.push(item.innerText.split('\n')[3]);
      });

      likeList = [...temp];
    }
  });

  new Sortable(disEl, {
    animation: 150,
    group: 'shared',

    onEnd: (event) => {
      if (!equals(event)) {
        const temp = [];
        Object.values(event.to.children).forEach((item) => {
          temp.push(item.innerText.split('\n')[3]);
        });

        likeList = [...temp];
      }
    }
  });
};

const equals = (event) =>
  Object.values(event.from.children).length ===
    Object.values(event.to.children).length &&
  Object.values(event.from.children).every(
    (v, i) => v === Object.values(event.to.children)[i]
  );

const submitPlan = async () => {
  console.log(likeList);

  // await getDistance(
  //   { attractionId: likeList },
  //   (response) => {
  //     console.log(response.data.distances);
  //     resultList.value = response.data.distances;
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );
};

watch(
  () => resultList.value,
  () => {
    this.$forceUpdate();
  },
  { deep: true }
);
</script>

<template>
  <div style="background-color: #fafafa; height: 84vh">
    <p class="plan-title pa-8">🤸🏻‍♂️ 뚜벅뚜벅 여행 일정 짜기🐾</p>

    <div class="d-flex justify-center">
      <div
        class="d-flex flex-column align-center bg-white mx-4 rounded"
        style="width: 32rem; height: 50rem; outline: 1px solid #eeeeee"
      >
        <div class="d-flex align-center mt-8 mb-6" style="margin-right: 60%">
          <v-icon
            color="indigo-darken-3"
            icon="mdi-comment-plus"
            size="2rem"
          ></v-icon>
          <h2 class="plan-subtitle ml-2">일정 추가</h2>
        </div>

        <ul ref="likeElRef" style="height: 60rem">
          <template v-for="(item, i) in likeItems" :key="i">
            <li>
              <v-card
                class="my-1"
                style="width: 26rem; border-radius: 16px"
                height="90"
                elevation="4"
              >
                <v-card-item>
                  <p class="place-name">{{ item.name }}</p>
                  <v-card-subtitle>{{ item.address }}</v-card-subtitle>
                  <v-card-text style="font-size: 0px">{{
                    item.id
                  }}</v-card-text>
                </v-card-item>
              </v-card>
            </li>
          </template>
        </ul>
      </div>

      <div
        class="d-flex flex-column align-center bg-white mx-4 rounded"
        style="width: 32rem; height: 50rem; outline: 1px solid #eeeeee"
      >
        <div class="d-flex align-center mt-8 mb-6" style="margin-right: 60%">
          <v-icon color="error" icon="mdi-comment-minus" size="2rem"></v-icon>
          <h2 class="plan-subtitle ml-2">일정 삭제</h2>
        </div>
        <ul ref="disElRef" style="height: 60rem"></ul>
      </div>
    </div>
    <div class="d-flex justify-center mt-12">
      <v-btn
        color="green-darken-3"
        size="large"
        style="border-radius: 32px; font-family: 'pretendard-regular'"
        prepend-icon="mdi-check"
        @click="submitPlan"
      >
        결정했어요!

        <v-dialog v-model="dialog" activator="parent" width="50rem">
          <v-card class="pa-8">
            <p
              class="text-center"
              style="font-family: 'pretendard-bold'; font-size: x-large"
            >
              예상되는 여정
            </p>
            <!-- <v-card-text>{{ resultList.value }}</v-card-text> -->
            <v-card-text>
              ========성산 일출봉 → 천제연폭포=======<br>
              [걸어서는 갈 수 없습니다.]<br>
              [대중교통 이용시 1시간 55분, 도보15분환승2회요금 3,000원62.8km]<br>
              [성산일출봉입구 정류장 406000817, 고성환승정류장(고성리 한국물류) 정류장 406001088, <br>
              제주월드컵경기장 서귀포버스터미널 정류장 406000069, 천제연폭포 정류장]<br>
              제주특별자치도 서귀포시 천제연로 132<br>
              ========천제연폭포 → 중문-색달해변=======<br>
              [걸어서 19분, 1.2km, 57kcal소모]<br>
              [대중교통 이용시 11분, 도보7분환승없음요금 1,150원1.9km]<br>
              [천제연폭포 정류장 406000528, 중문골프장 정류장]</v-card-text
            >
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false"
                >알겠어요!</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
    <!-- <div>{{ resultList.value }}</div> -->
  </div>
</template>

<style>
h2 {
  text-align: center;
}

li {
  list-style-type: none;
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;
}
li.blue-bg {
  background-color: lightblue;
}

.plan-title {
  font-family: 'pretendard-extraBold';
  font-size: 2.5rem;
  text-align: center;
}

.plan-subtitle {
  font-family: 'pretendard-regular';
  font-size: 1.2rem;
}

.place-name {
  font-family: 'pretendard-bold';
  font-size: 1.4rem;
}
</style>