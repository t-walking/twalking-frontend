<script setup>
import { ref, onMounted } from 'vue';
import { listSido, listGugun, listPlaces } from '@/api/place';

import KakaoMap from '@/components/search/KakaoMap.vue';
import SearchSelect from '@/components/search/SearchSelect.vue';
import SearchType from '@/components/search/SearchType.vue';
import PlaceCards from '@/components/search/PlaceCards.vue';

let typeList = [];
const drawer = ref(true);
const rail = ref(true);

const sidoList = ref([]);
const gugunList = ref([{ text: '구군선택', value: '' }]);
const touristPlaces = ref([]);
const selectPlace = ref({});

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: []
});

onMounted(() => {
  getSidoList();
});

const getSidoList = () => {
  listSido(
    ({ data }) => {
      let options = [];
      options.push({ text: '시도선택', value: '' });
      data.sidos.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val) => {
  param.value.sidoCode = val;

  listGugun(
    { sidoCode: val },
    ({ data }) => {
      let options = [];
      options.push({ text: '구군선택', value: '' });
      data.guguns.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  param.value.gugunCode = val;
  if (param.value.contentTypeId.length !== 0) {
    getTouristPlaces();
  }
};

const onChangeType = (val) => {
  if (val.isSelected) {
    typeList.push(val.code);
    param.value.contentTypeId = typeList.map((type) => parseInt(type));
  } else {
    typeList = typeList.filter((type) => type != val.code);
    param.value.contentTypeId = typeList.map((type) => parseInt(type));
  }
  if (param.value.gugunCode !== 0) {
    getTouristPlaces();
  }
};

const getTouristPlaces = async () => {
  await listPlaces(
    param.value,
    (response) => {
      touristPlaces.value = response.data.attractions;
    },
    (err) => {
      console.log(err);
    }
  );
};

const viewPlace = (place) => {
  selectPlace.value = place;
};
</script>

<template>
  <v-layout>
    <v-navigation-drawer
      class="mapDrawer bg-grey-lighten-4"
      :width="500"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item label="prepend-inner" nav>
        <template v-slot:prepend-inner>
          <v-icon x-large>mdi-magnify</v-icon>
        </template>
        <p class="ml-4" style="font-size: large">🧭 여정 탐색하기</p>
        <template v-slot:append>
          <v-btn
            size="large"
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
      <v-list-item append-icon="prepend-inner">
        <v-divider class="mb-8"></v-divider>
        <v-row class="d-flex justify-center">
          <v-col cols="5">
            <SearchSelect
              :selectOption="sidoList"
              @onKeySelect="onChangeSido"
            />
          </v-col>
          <v-col cols="5">
            <SearchSelect
              :selectOption="gugunList"
              @onKeySelect="onChangeGugun"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <SearchType @onKeySelect="onChangeType" />
          </v-col>
          <v-divider></v-divider>
          <v-col cols="10">
            <PlaceCards :places="touristPlaces" @viewPlace="viewPlace" />
          </v-col>
        </v-row>
      </v-list-item>
    </v-navigation-drawer>
    <v-main style="height: 84vh">
      <KakaoMap :places="touristPlaces" :selectPlace="selectPlace" />
    </v-main>
  </v-layout>
</template>

<style>
.mapDrawer {
  font-family: 'pretendard-light';
}
</style>
